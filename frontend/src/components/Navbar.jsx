import React from "react";

export default function Navbar() {
  return (
    <nav className="glass-effect fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <i className="fas fa-database text-blue-600 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Database Normalizer
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#input" className="nav-tab text-gray-600 hover:text-blue-600 font-medium">
            Input
          </a>
          <a href="#analysis" className="nav-tab text-gray-600 hover:text-blue-600 font-medium">
            Analysis
          </a>
          <a href="#results" className="nav-tab text-gray-600 hover:text-blue-600 font-medium">
            Results
          </a>
          <a href="#export" className="nav-tab text-gray-600 hover:text-blue-600 font-medium">
            Export
          </a>
        </div>

        {/* Get Started Button */}
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl flex items-center transition-transform hover:scale-105">
          <i className="fas fa-rocket mr-2"></i> Get Started
        </button>
      </div>
    </nav>
  );
}
