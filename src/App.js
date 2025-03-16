import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import WeatherWidget from "./components/WeatherWidget";
import NewsPage from "./components/NewsWidget";
import FinancePage from "./components/FinancePage";
import MovieWidget from "./components/MovieWidget";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex bg-gradient-to-r from-gray-900 to-gray-500 text-white">
        
        <Sidebar />

        
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<WeatherWidget />} />
            <Route path="/weather" element={<WeatherWidget />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/movies" element={<MovieWidget/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;