import { useEffect, useState } from "react";

const URL =
  "https://v6.exchangerate-api.com/v6/660666659bc5cb546591b2f8/latest/USD";

const Currency = () => {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("KES");
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

  return (
    <div className="flex flex-row mt-8 gap-x-12">
      {/* curr 1 */}
      <div className="border-black border-2 rounded-lg p-1 bg-white">
        <select
          className="bg-black text-white rounded-lg pt-2 pb-2"
          value={currency1}
          onChange={(e) => setCurrency1(e.target.value)}
        >
          {Object.keys(exchangeRates).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          className="ml-3 border-b-2 border-blue-700 outline-none"
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
        />
      </div>
      {/* curr 2 */}
      <div className="border-black border-2 rounded-lg p-1 bg-white">
        <select
          className="bg-black text-white rounded-lg pt-2 pb-2"
          value={currency2}
          onChange={(e) => setCurrency2(e.target.value)}
        >
          {Object.keys(exchangeRates).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <input
          className="ml-3 border-b-2 border-blue-700 outline-none"
          type="number"
          value={amount2}
          onChange={(e) => setAmount2(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Currency;
