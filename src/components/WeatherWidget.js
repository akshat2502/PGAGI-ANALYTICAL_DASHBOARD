import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "react-rain-animation/lib/style.css"; 
import Rain from "react-rain-animation";

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return "🌞";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Snow":
      return "❄️";
    case "Thunderstorm":
      return "⚡";
    case "Mist":
    case "Smoke":
      return "🌫️";
    default:
      return "🌈";
  }
};

const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const WEATHER_API_KEY = "660aeabb1e3b0ad5847c1df8ed534bbc";

  const fetchWeatherData = async (city) => {
    if (!city) return;
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      setWeatherData(weatherResponse.data);

      const dailyData = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setForecastData(
        dailyData.map((entry) => ({
          date: new Date(entry.dt_txt).toLocaleDateString(),
          temp: entry.main.temp,
          humidity: entry.main.humidity,
          wind: entry.wind.speed,
        }))
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
        {
          headers: {
            "X-RapidAPI-Key": "bda2cafdb0msh30591e001eef59fp10da7fjsn80a11b38bf05",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      setSuggestions(response.data.data.map((city) => city.city));
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  return (
    <div className="relative">
      {weatherData && weatherData.weather[0].main === "Rain" && <Rain />}

      <div
        style={{
          backgroundImage: 'url("https://png.pngtree.com/background/20230614/original/pngtree-twilight-shot-of-a-rain-drops-covered-street-picture-image_3460396.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="p-9 rounded-2xl shadow-lg w-4/5 mx-auto mt-10 relative z-10 bg-gradient-to-br from-gray-800 to-gray-950"
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Weather Widget</h2>

        {/* Search Bar */}
        <h4 className="text-center text-gray-300">Please type letter by letter with one second gap</h4>
        <div className="relative mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              fetchCitySuggestions(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && setCity(searchInput)}
            placeholder="Search city..."
            className="w-full p-4 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 bg-gray-700 placeholder-gray-400"
          />
          <ul className="absolute w-full bg-gray-800 border border-gray-700 mt-1 rounded-md shadow-lg max-h-40 overflow-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setCity(suggestion);
                  setSearchInput("");
                  setSuggestions([]);
                }}
                className="p-3 cursor-pointer hover:bg-gray-700 transition duration-200 text-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Weather */}
        {weatherData && (
          <div className="p-8 rounded-xl shadow-md mb-6 bg-gradient-to-l from-indigo-700 to-purple-800 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-medium">Current Weather in {weatherData.name}</h3>
              <span className="text-6xl">{getWeatherIcon(weatherData.weather[0].main)}</span>
            </div>
            <div className="text-lg mb-2">
              <strong>Temperature:</strong> {weatherData.main.temp} °C
            </div>
            <div className="text-lg mb-2">
              <strong>Humidity:</strong> {weatherData.main.humidity} %
            </div>
            <div className="text-lg mb-2">
              <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
            </div>
            <div className="text-lg">
              <strong>Condition:</strong> {weatherData.weather[0].description}
            </div>
          </div>
        )}

        {/* Forecast Chart */}
        {forecastData.length > 0 && (
          <div className="p-8 rounded-xl shadow-md bg-gradient-to-l from-purple-500 to-indigo-800 text-white">
            <h3 className="text-xl font-medium mb-4">7-Day Forecast</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#d1d5db' }} />
                <YAxis tick={{ fontSize: 12, fill: '#d1d5db' }} />
                <Tooltip contentStyle={{ backgroundColor: "#374151", color: "#d1d5db" }} labelStyle={{ color: "#d1d5db" }} />
                <Line type="monotone" dataKey="temp" stroke="#FF8C00" />
                <Line type="monotone" dataKey="humidity" stroke="#32CD32" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;