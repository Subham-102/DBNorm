import React, { useState } from 'react';

export default function AnalysisSection({ onDetect, onNormalize, loading, schema }) {
  const [targetForm, setTargetForm] = useState("3NF");

  const handleDetectClick = () => {
    // Correctly pass the schema object
    onDetect(schema);
  };

  const handleNormalizeClick = () => {
    // Correctly pass both the schema object AND the targetForm string
    onNormalize(schema, targetForm);
  };

  return (
    <section id="analysis" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Run Analysis & Normalization</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Once your table structure is defined, click the buttons below to analyze its normal form or perform a full normalization.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleDetectClick}
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Analyzing...' : 'Detect Normal Form'}
          </button>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <select
              value={targetForm}
              onChange={(e) => setTargetForm(e.target.value)}
              className="w-1/2 md:w-auto px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="3NF">3NF</option>
              <option value="BCNF">BCNF</option>
            </select>
            <button
              onClick={handleNormalizeClick}
              disabled={loading}
              className="w-1/2 md:w-auto px-8 py-4 rounded-xl text-white font-semibold bg-purple-600 hover:bg-purple-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Normalizing...' : 'Normalize to Target'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}