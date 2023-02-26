import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import styles from "./currencyConverter.module.css";

const CurrencyConverter: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("UAH");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>();
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);

  let toAmount: string, fromAmount: string;
  if (amountInFromCurrency) {
    fromAmount = amount.toString();
    toAmount = (amount / exchangeRate!).toFixed(2);
  } else {
    toAmount = amount.toString();
    fromAmount = (amount * exchangeRate!).toFixed(2);
  }

  useEffect(() => {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${toCurrency}`)
      .then((response) => {
        setExchangeRate(response.data.rates[fromCurrency]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
    setAmountInFromCurrency(false);
  };

  return (
    <div className={styles.converter}>
      <div className={styles.from}>
        <input type='number' value={fromAmount} onChange={handleFromAmountChange} className={styles.input} />
        <select
          value={fromCurrency}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setFromCurrency(e.target.value)}
          className={styles.select}>
          <option value='UAH'>UAH</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
        </select>
      </div>
      <div className={styles.to}>
        <input type='number' value={toAmount} onChange={handleToAmountChange} className={styles.input} />
        <select
          value={toCurrency}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setToCurrency(e.target.value)}
          className={styles.select}>
          <option value='USD'>USD</option>
          <option value='UAH'>UAH</option>
          <option value='EUR'>EUR</option>
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
