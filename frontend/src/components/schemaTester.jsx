import React, { useState } from "react";
import { detectNormalForm, normalizeTo } from "../api/normService";

function normalizePrimaryKey(pk) {
  if (!pk) return undefined;
  if (Array.isArray(pk)) {
    return pk.flatMap(item =>
      String(item).split(",").map(s => s.trim()).filter(Boolean)
    );
  }
  return String(pk).includes(",")
    ? String(pk).split(",").map(s => s.trim()).filter(Boolean)
    : String(pk).split(/\s+/).map(s => s.trim()).filter(Boolean);
}

const SchemaTester = () => {
  const [input, setInput] = useState(`{
  "tableName": "Student",
  "attributes": ["A", "B", "C", "D"],
  "primaryKey": ["A", "B"],
  "functionalDependencies": [
    { "lhs": ["A","B"], "rhs": ["C"] },
    { "lhs": ["C"], "rhs": ["D"] }
  ]
}`);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);

  const handleDetect = async () => {
    try {
      const payload = JSON.parse(input);
      if (payload.primaryKey) {
        payload.primaryKey = normalizePrimaryKey(payload.primaryKey);
      }
      const res = await detectNormalForm(payload);
      setOutput(res);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNormalize = async () => {
    try {
      const payload = JSON.parse(input);
      if (payload.primaryKey) {
        payload.primaryKey = normalizePrimaryKey(payload.primaryKey);
      }
      const res = await normalizeTo(payload, "3NF");
      setOutput(res);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Schema Tester</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        cols={60}
      />
      <br />
      <button onClick={handleDetect}>Detect Normal Form</button>
      <button onClick={handleNormalize}>Normalize to 3NF</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {output && (
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default SchemaTester;
