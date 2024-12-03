import { useState } from 'react';
import styles from './PaymentOptions.module.css';

export default function PaymentOptions() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showMoreCryptos, setShowMoreCryptos] = useState(false); // Estado para controlar la expansión de criptomonedas
    const [cryptoPrices, setCryptoPrices] = useState({});
    const [loading, setLoading] = useState(false);

     
  const cryptoMap = {
    Bitcoin: 'Bitcoin.png',
    Ethereum: 'Ethereum.png',
    USDcoin: 'usdcoin.png',
    Dai: 'dai',
    BitcoinCash: 'bitcoin-cash',
    Dogecoin: 'dogecoin',
  };

    
    const fetchCryptoPrice = async (cryptoName) => {
        setLoading(true); 
        try {
            const cryptoId = cryptoMap[cryptoName];
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`
            );
            const data = await response.json();
            if (data[cryptoId] && data[cryptoId].usd !== undefined) {
            setCryptoPrices((prevPrices) => ({
                ...prevPrices,
                [cryptoName]: data[cryptoId].usd,  
                }));
            } else {
                console.error("Invalid response:", data);
            }
        } catch (error) {
            console.error("Error fetching crypto price:", error);
        }
        setLoading(false); 
    };

    const renderContent = () => {
        switch (selectedOption) {
            case 'creditCard':
                return (
                    <div className={styles.paymentForm}>
                        <input type="text" placeholder="Card number" className={styles.input} />
                        <input type="text" placeholder="Expiration date (MM/YY)" className={styles.input} />
                        <input type="text" placeholder="Security code" className={styles.input} />
                        <input type="text" placeholder="Name on card" className={styles.input} />
                    </div>
                );
            case 'coinbase':
                return (
                    <div className={styles.coinbaseInfo}>
                        <p>After clicking &quot;Pay now&quot;, you will be redirected to Coinbase to complete your purchase securely.</p>
                        <p><strong>Coinbase total: $383.60 USD</strong></p>
                    </div>
                );
            case 'cryptocurrency':
                return (
                    <div className={styles.cryptoOptions}>
                        <p>Select a cryptocurrency to continue. You&apos;ll connect a wallet in the next step.</p>
                        <div className={styles.cryptoList}>
                            {Object.keys(cryptoMap).slice(0,3).map((cryptoName) => (
                                <button 
                                    key={cryptoName}
                                    onClick={() => fetchCryptoPrice(cryptoName)}
                                    className={styles.cryptoButton}
                                >   
                                  <img
                                 src={`/icons/${cryptoMap[cryptoName]}`}
                                    alt={cryptoName}
                                      className={styles.icon}
                                     />
                                    
                                    {cryptoName} 
                                    {cryptoPrices[cryptoName] !== undefined ?(
                                        <span className={styles.price}>
                                            ${cryptoPrices[cryptoName].toFixed(2)}
                                        </span>
                                    ) : (
                                        <span className={styles.price}>Loading...</span>
                                    )}
                                </button>
                            ))}
                            {showMoreCryptos && (
                                Object.keys(cryptoMap).slice(3).map((cryptoName) => (
                                    <button
                                        key={cryptoName}
                                        onClick={() => fetchCryptoPrice(cryptoName)}
                                        className={styles.cryptoButton}
                                    >
                                        <img src={`/icons/${cryptoMap[cryptoName]}.jpg`} alt={cryptoName} className={styles.icon} />
                                        {cryptoName}
                                        {cryptoPrices[cryptoName] && (
                                            <span className={styles.price}>
                                                ${cryptoPrices[cryptoName].toFixed(2)}
                                            </span>
                                        )}
                                    </button>
                                ))
                            )}
                            <button
                                className={styles.showMoreButton}
                                onClick={() => setShowMoreCryptos(!showMoreCryptos)}
                            >
                                {showMoreCryptos ? "Show less" : "Show more"}
                            </button>
                        </div>
                    </div>
                );
            case 'cashOnDelivery':
                return (
                    <div className={styles.cashOnDeliveryInfo}>
                        <p>Additional details that the merchant manually enters to help buyers checkout with this payment method. Note: CTA is changed to &quot;Complete order&quot;</p>
                    </div>
                );
            default:
                return <p>Please select a payment method.</p>;
        }
    };

    return (
        <div className={styles.container}>
            <h2>Payment</h2>
            <p>All transactions are secure and encrypted</p>
            <div className={styles.options}>
                <label>
                    <input
                        type="radio"
                        name="paymentOption"
                        onClick={() => setSelectedOption('creditCard')}
                    />
                    Credit or Debit Card
                    <img src="/icons/visa.png" alt="Visa" className={styles.icon} />
                    <img src="/icons/master.png" alt="Mastercard" className={styles.icon} />
                    <img src="/icons/amex.png" alt="American Express" className={styles.icon} />
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentOption"
                        onClick={() => setSelectedOption('coinbase')}
                    />
                    Coinbase
                    <img src="/icons/coinbase.png" alt="Coinbase" className={styles.icon} />
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentOption"
                        onClick={() => setSelectedOption('cryptocurrency')}
                    />
                    Cryptocurrency
                    <img src="/icons/Bitcoin.png" alt="" className={styles.icon} />
                    <img src="/icons/Ethereum.png" alt="" className={styles.icon} />
                    <img src="/icons/usdcoin.png" alt="" className={styles.icon} />
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentOption"
                        onClick={() => setSelectedOption('cashOnDelivery')}
                    />
                    Cash on Delivery (COD)
                </label>
            </div>
            <div className={styles.selectedContent}>
                {loading ? <p>Loading...</p> : renderContent()}
            </div>
        </div>
    );
}
