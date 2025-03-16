import React from "react";
import { NavLink } from "react-router-dom";
import { FaCloudSun, FaNewspaper, FaDollarSign, FaFilm } from "react-icons/fa"; 

const Sidebar = () => {
  return (
    <div className="w-72 text-white min-h-screen shadow-md">
      <h2 className="text-2xl font-semibold text-center py-5 border-b tracking-wide border-gray-700">
        Dashboard
      </h2>
      <nav className="mt-6">
        <ul className="flex flex-col space-y-4">
          <li>
            <NavLink
              to="/weather"
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-5 rounded-md transition-colors ${
                  isActive ? "bg-blue-600 shadow" : "hover:bg-gray-800"
                }`
              }
            >
              <FaCloudSun size={20} />
              <span className="text-sm">Weather</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-5 rounded-md transition-colors ${
                  isActive ? "bg-blue-600 shadow" : "hover:bg-gray-800"
                }`
              }
            >
              <FaNewspaper size={20} />
              <span className="text-sm">News</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/finance"
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-5 rounded-md transition-colors ${
                  isActive ? "bg-blue-600 shadow" : "hover:bg-gray-800"
                }`
              }
            >
              <FaDollarSign size={20} />
              <span className="text-sm">Finance</span>
            </NavLink>
          </li>
          {/* Add Movies Link */}
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-5 rounded-md transition-colors ${
                  isActive ? "bg-blue-600 shadow" : "hover:bg-gray-800"
                }`
              }
            >
              <FaFilm size={20} /> 
              <span className="text-sm">Movies</span> 
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;