import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const FinanceWidget = () => {
  const [stockData, setStockData] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeframe, setTimeframe] = useState("1week");

  const API_KEY = "247c53094022470a9785185cafd6f354";

  const fetchStockData = async (symbol, timeframe) => {
    if (!symbol) return;
    setLoading(true);
    setError("");
    try {
      const intervalMap = {
        "1week": { interval: "1day", outputsize: 7 },
        "1month": { interval: "1day", outputsize: 30 },
        "1year": { interval: "1week", outputsize: 52 },
      };
      const { interval, outputsize } = intervalMap[timeframe];

      const response = await axios.get(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${API_KEY}`
      );

      if (response.data && response.data.values) {
        const formattedData = response.data.values.map((item) => ({
          datetime: item.datetime,
          close: parseFloat(item.close),
        })).reverse(); 
        setStockData(formattedData);
      } else {
        setError("No data found for this symbol.");
      }
    } catch (err) {
      setError("Error fetching stock data.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchStockData(symbol, timeframe);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    if (symbol) fetchStockData(symbol, newTimeframe);
  };

  return (
    <div 
      style={{
        backgroundImage: 'url("https://www.internationalaccountingbulletin.com/wp-content/uploads/sites/9/2023/08/shutterstock_1875857281.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen p-6 ml-3 rounded-2xl"
    >
      <h2 className="text-4xl font-bold text-white text-center mb-8">Stock Market</h2>

      {/* Stock Symbol Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          className="px-4 py-2 rounded-md text-black"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-500 hover:to-indigo-500"
        >
          Search
        </button>
      </div>

      {/* Timeframe Selection */}
      <div className="flex justify-center space-x-4 mb-6">
        {["1week", "1month", "1year"].map((frame) => (
          <button
            key={frame}
            onClick={() => handleTimeframeChange(frame)}
            className={`px-4 py-2 rounded-md ${
              timeframe === frame ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {frame === "1week" ? "1 Week" : frame === "1month" ? "1 Month" : "1 Year"}
          </button>
        ))}
      </div>

      {/* Loading and Error Messages */}
      {loading && <div className="text-white text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Display Chart */}
      {stockData.length > 0 && (
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-center">Price Trend for {symbol}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />
              <XAxis dataKey="datetime" stroke="#d1d5db" />
              <YAxis stroke="#d1d5db" />
              <Tooltip contentStyle={{ backgroundColor: "#374151", color: "#d1d5db" }} labelStyle={{ color: "#d1d5db" }} />
              <Line type="monotone" dataKey="close" stroke="#a78bfa" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default FinanceWidget;