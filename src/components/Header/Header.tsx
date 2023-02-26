import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./header.module.css";

interface ExchangeRates {
  [key: string]: number;
}

const Header: React.FC = () => {
  const [exchangeRatesUsd, setExchangeRatesUsd] = useState<ExchangeRates>({});
  const [exchangeRatesEur, setExchangeRatesEur] = useState<ExchangeRates>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
        setExchangeRatesUsd(response.data.rates);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.get("https://api.exchangerate-api.com/v4/latest/EUR");
        setExchangeRatesEur(response.data.rates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Currency Converter</div>
      <div className={styles.row}>
        <div className={styles.label}>UAH/USD:</div>
        <div className={styles.count}>{exchangeRatesUsd.UAH?.toFixed(2)}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>UAH/EUR:</div>
        <div className={styles.count}>{exchangeRatesEur.UAH?.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Header;
