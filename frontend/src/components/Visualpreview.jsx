import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function InputSectionWithPreview() {
  const [tableName, setTableName] = useState("Employees");
  const [primaryKey, setPrimaryKey] = useState("employee_id");
  const [columns, setColumns] = useState(["employee_id", "name", "email", "department_id"]);
  const [newColumn, setNewColumn] = useState("");

  // Functional Dependencies (split into lhs & rhs)
  const [dependencies, setDependencies] = useState([
    { lhs: "department_id", rhs: "department_name" },
    { lhs: "manager_id", rhs: "manager_name" },
  ]);
  const [newLHS, setNewLHS] = useState("");
  const [newRHS, setNewRHS] = useState("");

  // Target Normal Form
  const [targetForm, setTargetForm] = useState("3NF");

  // Column functions
  const handleAddColumn = () => {
    const trimmed = newColumn.trim();
    if (trimmed && !columns.includes(trimmed)) {
      setColumns([...columns, trimmed]);
      setNewColumn("");
    }
  };
  const handleRemoveColumn = (col) => setColumns(columns.filter((c) => c !== col));

  // Dependency functions
  const handleAddDependency = () => {
    const lhsTrim = newLHS.trim();
    const rhsTrim = newRHS.trim();
    if (lhsTrim && rhsTrim) {
      setDependencies([...dependencies, { lhs: lhsTrim, rhs: rhsTrim }]);
      setNewLHS("");
      setNewRHS("");
    }
  };
  const handleRemoveDependency = (index) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };

  // Analyze button
  const handleAnalyze = () => {
    console.log({ tableName, primaryKey, columns, dependencies, targetForm });
    alert(`Normalization analysis triggered for ${targetForm}! Check console.`);
  };

  // Function to determine bullet color
  const getColumnColor = (col) => {
    if (col === primaryKey) return "bg-green-500"; // Primary key
    else if (dependencies.some((d) => d.lhs === col)) return "bg-purple-500"; // referenced in dependencies
    else return "bg-blue-500"; // Regular column
  };

  return (
    <section id="input" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Define Your Table Structure</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Input your current database table information and see live preview.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="card-hover bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg space-y-6">
            {/* Table Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Table Name</label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Dependencies</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newLHS}
                  onChange={(e) => setNewLHS(e.target.value)}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="LHS (determinant)"
                />
                <span className="font-bold">→</span>
                <input
                  type="text"
                  value={newRHS}
                  onChange={(e) => setNewRHS(e.target.value)}
                  className="w-1/2 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="RHS (dependent)"
                />
                <button
                  type="button"
                  onClick={handleAddDependency}
                  className="px-6 py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 flex items-center justify-center transition"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {dependencies.map((dep, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {dep.lhs} → {dep.rhs}
                    <button
                      type="button"
                      onClick={() => handleRemoveDependency(i)}
                      className="ml-1 text-green-600 hover:text-green-900 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Target Normal Form */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Normal Form
              </label>
              <select
                value={targetForm}
                onChange={(e) => setTargetForm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="1NF">1NF</option>
                <option value="2NF">2NF</option>
                <option value="3NF">3NF</option>
                <option value="BCNF">BCNF</option>
              </select>
            </div>

            {/* Analyze Button */}
            <button
              type="button"
              onClick={handleAnalyze}
              className="w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center bg-purple-600 hover:bg-purple-700 transition"
            >
              <i className="fas fa-search mr-2"></i> Analyze Normalization
            </button>
          </div>

          {/* Right: Live Preview */}
          <div className="card-hover bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Live Preview</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-table text-blue-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800">{tableName || "Table Name"}</h4>
                <p className="text-sm text-gray-600">Primary Key: {primaryKey || "PK"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Columns */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-blue-600 font-semibold mb-2">Columns</div>
                  <div className="space-y-1 text-sm">
                    {columns.map((col, i) => (
                      <div key={i} className="flex items-center">
                        <div className={`w-2 h-2 ${getColumnColor(col)} rounded-full mr-2`}></div>
                        {col}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dependencies */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-purple-600 font-semibold mb-2">Dependencies</div>
                  <div className="space-y-1 text-sm">
                    {dependencies.map((dep, i) => (
                      <div key={i} className="bg-blue-50 px-2 py-1 rounded">
                        {dep.lhs} → {dep.rhs}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Target Form Preview */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Target Normal Form: <span className="font-semibold">{targetForm}</span>
                </p>
              </div>
            </div>
          </div>
          {/* End Preview */}
        </div>
      </div>
    </section>
  );
}
