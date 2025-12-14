import React from "react";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating Icon */}
          <div className="floating-action inline-block mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-2xl">
              <i className="fas fa-database text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"></i>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Transform Your Database Schema with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Intelligent Normalization
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Analyze, optimize, and transform your database tables into perfect normal forms. Our AI-powered engine detects anomalies and creates optimized schemas automatically.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-transform hover:scale-105 flex items-center">
              <i className="fas fa-bolt mr-2"></i> Start Normalizing
            </button>
            <button className="btn-secondary px-8 py-4 rounded-xl text-white font-semibold text-lg bg-gray-800 hover:bg-gray-900 transition flex items-center">
              <i className="fas fa-play-circle mr-2"></i> Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
