import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// This component is now responsible for collecting input and
// passing the structured schema data to its parent.
export default function InputSection({ onSchemaUpdate }) {
  const [tableName, setTableName] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState("");

  const [dependencies, setDependencies] = useState([]);
  const [newLHS, setNewLHS] = useState("");
  const [newRHS, setNewRHS] = useState("");

  // Use useEffect to automatically update the parent state
  // whenever any of the local states change.
  useEffect(() => {
    const pkArray = primaryKey.split(",").map(s => s.trim()).filter(Boolean);
    const payload = {
      tableName: tableName,
      attributes: columns,
      primaryKey: pkArray,
      functionalDependencies: dependencies,
    };
    onSchemaUpdate(payload);
  }, [tableName, primaryKey, columns, dependencies, onSchemaUpdate]);

  const handleAddColumn = () => {
    const trimmed = newColumn.trim();
    if (trimmed && !columns.includes(trimmed)) {
      setColumns([...columns, trimmed]);
      setNewColumn("");
    }
  };

  const handleRemoveColumn = (col) => {
    setColumns(columns.filter((c) => c !== col));
  };

  // Utility function to split a string by commas and spaces
  const splitAttributes = (inputStr) => {
    return inputStr
      .split(/,\s*| /)
      .map((attr) => attr.trim())
      .filter((attr) => attr.length > 0);
  };

  const handleAddDependency = () => {
    const lhs = splitAttributes(newLHS);
    const rhs = splitAttributes(newRHS);

    if (lhs.length > 0 && rhs.length > 0) {
      const newDep = { lhs: lhs, rhs: rhs };
      setDependencies([...dependencies, newDep]);
      setNewLHS("");
      setNewRHS("");
    }
  };

  const handleRemoveDependency = (index) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };
  
  return (
    <section id="input" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Define Your Table Structure
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Input your current database table information and let our engine work its magic
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card-hover bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg space-y-6">
            {/* Table Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Table Name</label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Employees, Customers"
              />
            </div>

            {/* Primary Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Key</label>
              <input
                type="text"
                value={primaryKey}
                onChange={(e) => setPrimaryKey(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., id, employee_id, or composite keys like id, employee_id"
              />
            </div>

            {/* Columns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newColumn}
                  onChange={(e) => setNewColumn(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add column name"
                />
                <button
                  type="button"
                  onClick={handleAddColumn}
                  className="px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {columns.map((col) => (
                  <span
                    key={col}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {col}
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(col)}
                      className="ml-1 text-blue-600 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Functional Dependencies</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newLHS}
                  onChange={(e) => setNewLHS(e.target.value)}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="LHS (e.g., A, B)"
                />
                <span className="text-gray-500 font-bold text-lg">→</span>
                <input
                  type="text"
                  value={newRHS}
                  onChange={(e) => setNewRHS(e.target.value)}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="RHS (e.g., C)"
                />
                <button
                  type="button"
                  onClick={handleAddDependency}
                  className="px-6 py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 flex items-center justify-center transition"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {dependencies.map((dep, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1 justify-between"
                  >
                    <span>
                      <b>{dep.lhs.join(", ")}</b> → <b>{dep.rhs.join(", ")}</b>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDependency(index)}
                      className="ml-1 text-green-600 hover:text-green-900 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Optional empty space for padding */}
            <div className="flex justify-center pt-4">
              {/* This button is now removed. The logic is in AnalysisSection.jsx */}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Database Table Illustration"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}