import React, { Component, ReactNode } from "react";

// Definir las propiedades que recibirá el ErrorBoundary,
// en este caso, cualquier componente hijo.
interface Props {
  children: ReactNode;
}

// Definir el estado que almacenará si hay un error y cuál es el error.
interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Inicialmente no hay error.
    this.state = { hasError: false };
  }

  // Este método se ejecuta cuando se produce un error en alguno de los componentes hijos.
  // Actualiza el estado para mostrar la interfaz de error.
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // Permite registrar o hacer seguimiento del error (por ejemplo, enviarlo a un servicio de monitoreo)
  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error capturado en ErrorBoundary:", error, errorInfo);
  }

  render() {
    // Si se ha producido un error, renderiza un mensaje de error.
    if (this.state.hasError) {
      return <h1>Algo salió mal: {this.state.error?.message}</h1>;
    }
    // Si no hay errores, renderiza los hijos normalmente.
    return this.props.children;
  }
}

export default ErrorBoundary;