import { useEffect, useState } from "react";

const URL =
  "https://v6.exchangerate-api.com/v6/660666659bc5cb546591b2f8/latest/USD";

const Currency = () => {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates || {});
        console.log(exchangeRates);
      } catch (error) {
        console.log("Error fetching: " + error);
      }
    }
    fetchExchangeRates();
  }, []);

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;

    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    return (amount * rate).toFixed(2);
  };

  useEffect(() => {
    if (exchangeRates[currency1] && exchangeRates[currency2]) {
      const convertedAmount = convertCurrency(amount1, currency1, currency2);
      setAmount2(convertedAmount);
    }
  }, [amount1, currency1, currency2, exchangeRates]);

  return <div></div>;
};

export default Currency;
