import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Herosection from './components/Herosection';
import Feature from './components/Feature';
import InputSection from './components/Inputsection';
import AnalysisSection from './components/AnalysisSection';
import ResultSection from './components/ResultSection';
import { detectNormalForm, normalizeTo } from './api/normService';
import './App.css';

function App() {
  const [schema, setSchema] = useState({
    tableName: "",
    attributes: [],
    primaryKey: [],
    functionalDependencies: []
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSchemaUpdate = useCallback((newSchema) => {
    setSchema(newSchema);
    setResult(null); // Clear previous results when the schema changes
  }, []);

  const handleAnalyze = async (schemaToAnalyze) => {
    if (schemaToAnalyze.attributes.length === 0 || schemaToAnalyze.functionalDependencies.length === 0) {
      setError("Please provide attributes and functional dependencies to analyze.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await detectNormalForm(schemaToAnalyze);
      setResult(response);
    } catch (err) {
      // Log the full error to the console for detailed debugging
      console.error("Analysis API call failed:", err);
      setError("Failed to fetch analysis from the backend. Please check your input and server status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNormalize = async (schemaToNormalize, target) => {
    if (schemaToNormalize.attributes.length === 0 || schemaToNormalize.functionalDependencies.length === 0) {
      setError("Please provide attributes and functional dependencies to normalize.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await normalizeTo(schemaToNormalize, target);
      setResult(response);
    } catch (err) {
      // Log the full error to the console for detailed debugging
      console.error("Normalization API call failed:", err);
      setError("Failed to normalize. Please check your input and server status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Herosection />
      <Feature />
      <InputSection onSchemaUpdate={handleSchemaUpdate} />
      <AnalysisSection
        onDetect={handleAnalyze}
        onNormalize={handleNormalize}
        loading={loading}
        schema={schema}
      />
      {error && (
        <div className="container mx-auto px-4 mt-8">
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      )}
      <ResultSection result={result} />
    </>
  );
}

export default App;