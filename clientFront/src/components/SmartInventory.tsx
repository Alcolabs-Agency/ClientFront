import React, { useState, ChangeEvent } from "react";
import { ProgressBar } from "react-bootstrap";
import styles from "./SmartInventory.module.css";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
pdfjsLib.GlobalWorkerOptions.isEvalSupported = false;

const baseUrl = (import.meta as any).env.VITE_API_URL;
console.log("Base URL =>", baseUrl);

interface ExtractedRow {
  bbox: string;
  class: string;
  text: string;
  confidence: number;
}

const SmartInventory: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [tableData, setTableData] = useState<ExtractedRow[]>([]);
  const [modifiedTableData, setModifiedTableData] = useState<ExtractedRow[]>(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const dataToRender = isEditing ? modifiedTableData : tableData;

  const [documentColumns] = useState([
    "DESCRIPCIÓN",
    "CANTIDAD",
    "PRECIO",
    "PRECISIÓN",
  ]);

  // Almacena “thumbnails” si es PDF
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);

      if (selectedFile.type.startsWith("image/")) {
        // Es una imagen
        setImage(URL.createObjectURL(selectedFile));
        setThumbnails([]);
      } else if (selectedFile.type === "application/pdf") {
        // Es un PDF
        setImage(null);
        generatePDFThumbnails(selectedFile);
      } else {
        setError("Por favor selecciona una imagen o un archivo PDF.");
        setFile(null);
        setImage(null);
        setThumbnails([]);
      }
    }
  };

  // Generar miniaturas del PDF
  const generatePDFThumbnails = async (file: File) => {
    try {
      const typedarray = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      const numPages = pdf.numPages;
      const tempThumbnails: string[] = [];

      for (let currentPage = 1; currentPage <= numPages; currentPage++) {
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const imgData = canvas.toDataURL("image/png");
        tempThumbnails.push(imgData);
      }
      setThumbnails(tempThumbnails);
    } catch (error) {
      console.error("Error al generar miniaturas del PDF:", error);
      setError("Error al generar miniaturas del PDF.");
    }
  };

  // Enviar archivo al backend
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setError("No se ha seleccionado ningún archivo.");
      return;
    }
    setLoading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${baseUrl}/process-document`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Error en la respuesta del servidor. Status:",
          response.status
        );
        console.error("Cuerpo de la respuesta (errorText):", errorText);

        let errorMessage = `Error al procesar el documento. Código de estado: ${response.status}`;
        try {
          if (errorText) {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorMessage;
          }
        } catch (err) {
          console.error("Error al parsear la respuesta de error:", err);
        }
        throw new Error(errorMessage);
      }

      
      const responseText = await response.text();
      if (!responseText) {
        throw new Error("Respuesta vacía del servidor.");
      }
      const result = JSON.parse(responseText);
      console.log("✅ Datos recibidos:", result);

      
      const rows: ExtractedRow[] = result.data;
      if (Array.isArray(rows) && rows.length > 0) {
        setTableData(rows);
        setModifiedTableData(JSON.parse(JSON.stringify(rows)));
      } else {
        setError(
          "El modelo no detectó datos en el documento. Verifica que contenga las clases esperadas."
        );
      }

      const processedImages = result.images;
      if (processedImages?.length > 0) {
        setThumbnails(
          processedImages.map((img: string) => `data:image/jpeg;base64,${img}`)
        );
      } else {
        setThumbnails([]);
      }

      setProgress(100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el documento."
      );
      console.error("❌ Error al procesar el documento:", err);
    } finally {
      setLoading(false);
    }
  };
  // Reiniciar
  const resetForm = () => {
    setFile(null);
    setImage(null);
    setTableData([]);
    setThumbnails([]);
    setProgress(0);
    setError(null);
    setLoading(false);
  };

  // Exportar datos a CSV
  const exportToCSV = () => {
    if (tableData.length === 0) return;

    const csvRows: string[] = [];
  
    csvRows.push(documentColumns.join(",") as string);

 
    tableData.forEach((row) => {
      
      const descripcion = row.class === "descripcion" ? row.text : "";
      const cantidad = row.class === "cantidad" ? row.text : "";
      const precio = row.class === "precio" ? row.text : "";
      const precision = row.confidence.toString();

      csvRows.push(
        `${descripcion},${cantidad},${precio},${precision}` as string
      );
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const csvUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "datos_extraidos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveChanges = async () => {
    try {
      const body = {
        rows: modifiedTableData,
        invoiceNumber: "NV-2023-001",
      };

      const response = await fetch(`${baseUrl}/save-document-changes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      const result = await response.json();
      console.log("Cambios guardados con éxito:", result);

   
      setTableData([...modifiedTableData]);
   
      setIsEditing(false);
    
      alert("¡Cambios guardados con éxito!");
    } catch (err) {
      console.error("Error guardando cambios:", err);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };


  const handleAddRow = () => {
    const newRow: ExtractedRow = {
      bbox: "",
      class: "",
      text: "",
      confidence: 0, 
    };

    
    setModifiedTableData((prev) => [...prev, newRow]);
  };

  return (
    <div className={styles["smart-inventory-container"]}>
      <div className={styles.header}>
        <h2>Escaneo de Facturas PNG o PDF</h2>
        <div>
          <button className={styles["btn-archivado"]} disabled={loading}>
            Archivada
          </button>
          <button className={styles["btn-reseteo"]} onClick={resetForm}>
            Reseteo
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles["upload-section"]}>
          {!file ? (
            <div className={styles.dropzone}>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                disabled={loading}
              />
              <p>Clic o arrastra tu archivo aquí (PNG, JPG o PDF)</p>
            </div>
          ) : (
            <div className={styles.preview}>
              {image && (
                <div className={styles["image-preview"]}>
                  <img src={image} alt="Vista previa" />
                </div>
              )}
              {thumbnails.length > 0 && (
                <div className={styles["pdf-thumbnails"]}>
                  {thumbnails.map((thumb, idx) => (
                    <img key={idx} src={thumb} alt={`pdf-page-${idx}`} />
                  ))}
                </div>
              )}
              {loading && (
                <div className={styles["progress-bar-wrapper"]}>
                  <ProgressBar now={progress} label={`${progress}%`} />
                  <p>Procesando... {progress}%</p>
                </div>
              )}
            </div>
          )}

          {file && (
            <div className={styles.actions}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(
                    e as unknown as React.FormEvent<HTMLFormElement>
                  );
                }}
                disabled={loading}
                className={styles["btn-procesar"]}
              >
                {loading ? `Procesando... ${progress}%` : "Procesar Documento"}
              </button>
              <button onClick={resetForm} className={styles["btn-reiniciar"]}>
                Reiniciar
              </button>
            </div>
          )}

          {error && <p className={styles["error-msg"]}>{error}</p>}
          {!loading && progress === 100 && (
            <p className={styles["success-msg"]}>
              ¡Archivo procesado con éxito! 😊
            </p>
          )}
        </div>

      
        <div className={styles["extracted-data-section"]}>
          {tableData.length === 0 ? (
            <div className={styles["no-data"]}>
              <p>No hay ningún documento seleccionado</p>
            </div>
          ) : (
            <div className={styles["datos-extraidos"]}>
             
              <div className={styles["info-header"]}>
                <p>
                  <strong>Tipo de documento:</strong> Factura
                </p>
                <p>
                  <strong>Número de documento:</strong> NV-2023-001
                </p>
              </div>

              <table className={styles["extract-table"]}>
                
                <thead>
                  <tr>
                    <th>CLASE</th>
                    <th>DESCRIPCIÓN</th>
                    <th>CANTIDAD</th>
                    <th>PRECIO</th>
                    <th>PRECISIÓN</th>
                  </tr>
                </thead>

                <tbody>
                  {dataToRender.map((row, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          {isEditing ? (
                            <select
                              value={row.class} 
                              onChange={(e) => {
                                const updated = [...modifiedTableData];
                                updated[idx].class = e.target.value;
                                setModifiedTableData(updated);
                              }}
                            >

                              <option value="">--Seleccionar--</option>
                              <option value="descripcion">descripcion</option>
                              <option value="cantidad">cantidad</option>
                              <option value="precio">precio</option>
                             
                            </select>
                          ) : (
                            row.class
                          )}
                        </td>

                        <td>
                          {row.class === "descripcion" ? (
                            isEditing ? (
                              <input
                                value={row.text}
                                onChange={(e) => {
                                  const updated = [...modifiedTableData];
                                  updated[idx].text = e.target.value;
                                  setModifiedTableData(updated);
                                }}
                              />
                            ) : (
                            
                              row.text
                            )
                          ) : (
                            
                            ""
                          )}
                        </td>

                       
                        <td>
                          {row.class === "cantidad" ? (
                            isEditing ? (
                              <input
                                value={row.text}
                                onChange={(e) => {
                                  const updated = [...modifiedTableData];
                                  updated[idx].text = e.target.value;
                                  setModifiedTableData(updated);
                                }}
                              />
                            ) : (
                              row.text
                            )
                          ) : (
                            ""
                          )}
                        </td>

                       
                        <td>
                          {row.class === "precio" ? (
                            isEditing ? (
                              <input
                                value={row.text}
                                onChange={(e) => {
                                  const updated = [...modifiedTableData];
                                  updated[idx].text = e.target.value;
                                  setModifiedTableData(updated);
                                }}
                              />
                            ) : (
                              row.text
                            )
                          ) : (
                            ""
                          )}
                        </td>

                       
                        <td>
                          {isEditing ? (
                            <input
                              value={row.confidence.toFixed(2)}
                              onChange={(e) => {
                                const updated = [...modifiedTableData];
                                updated[idx].confidence =
                                  parseFloat(e.target.value) || 0;
                                setModifiedTableData(updated);
                              }}
                            />
                          ) : (
                            row.confidence.toFixed(2) + "%"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles["table-actions-row"]}>
              
                <button
                  onClick={exportToCSV}
                  disabled={loading || !tableData}
                  className={styles["btn-export-csv"]}
                >
                  Exportar a CSV
                </button>
                <div className={styles["right-buttons"]}>
                  {!isEditing ? (
                    <button
                      className={styles["btn-editar"]}
                      onClick={() => {
                        setIsEditing(true);
                        setModifiedTableData(JSON.parse(JSON.stringify(tableData)));
                      }}
                    >
                      Editar
                    </button>
                  ) : (
                    <>
                      <button className={styles["btn-add"]} onClick={handleAddRow}>
                        + Agregar Fila
                      </button>

                      <button className={styles["btn-guardar"]} onClick={saveChanges}>
                        Guardar Cambios
                      </button>
                    </>

                  )}

                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default SmartInventory;
