import React from "react";

export default function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-search text-blue-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Analysis</h3>
          <p className="text-gray-600">
            Automatically detect normalization issues and dependencies in your database schema.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-cogs text-green-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Auto Optimization</h3>
          <p className="text-gray-600">
            Transform your tables into 3NF or BCNF with intelligent decomposition algorithms.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-download text-purple-600 text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Export</h3>
          <p className="text-gray-600">
            Export your normalized schema as SQL, JSON, or visual ER diagrams with one click.
          </p>
        </div>
      </div>
    </section>
  );
}
