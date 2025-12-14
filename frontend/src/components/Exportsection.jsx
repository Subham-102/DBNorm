import React from "react";
import { motion } from "framer-motion";

// Single Export Card
function ExportCard({
  icon,
  bgColor,
  textColor,
  title,
  description,
  buttonText,
  onClick,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0,0,0,0.2)" }}
      className="card-hover bg-white rounded-2xl p-6 text-center"
    >
      <div
        className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <i className={`${icon} ${textColor} text-2xl`} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <i className="fas fa-download" /> {buttonText}
      </button>
    </motion.div>
  );
}

// Combined Result Section
export default function ResultSection({ onDownload }) {
  const originalData = [
    {
      id: "101",
      first: "John",
      last: "Doe",
      email: "john@email.com",
      depId: "D001",
      depName: "Engineering",
      mgrId: "M201",
      mgrName: "Sarah Wilson",
      salary: 75000,
    },
    {
      id: "102",
      first: "Jane",
      last: "Smith",
      email: "jane@email.com",
      depId: "D001",
      depName: "Engineering",
      mgrId: "M201",
      mgrName: "Sarah Wilson",
      salary: 82000,
    },
    {
      id: "103",
      first: "Mike",
      last: "Johnson",
      email: "mike@email.com",
      depId: "D002",
      depName: "Marketing",
      mgrId: "M202",
      mgrName: "David Brown",
      salary: 68000,
    },
  ];

  const exportOptions = [
    {
      icon: "fas fa-code",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      title: "SQL Export",
      description: "Complete SQL schema with CREATE TABLE statements and constraints",
      buttonText: "Download SQL",
      key: "sql",
    },
    {
      icon: "fas fa-file-code",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      title: "JSON Schema",
      description: "Structured JSON format for API documentation and code generation",
      buttonText: "Download JSON",
      key: "json",
    },
    {
      icon: "fas fa-project-diagram",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      title: "ER Diagram",
      description: "Visual entity-relationship diagram for documentation and presentations",
      buttonText: "Download Diagram",
      key: "diagram",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <i className="fas fa-database text-blue-600 text-2xl"></i>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Database Normalizer Results</h1>
          </div>
          <span className="text-blue-100 hidden md:block">Converted Tables Output</span>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Result Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Normalization Complete</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
              <div className="text-sm font-semibold text-green-700">BCNF Achieved</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <i className="fas fa-table text-blue-500 text-2xl mb-2"></i>
              <div className="text-sm font-semibold text-blue-700">3 Tables Created</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <i className="fas fa-link text-purple-500 text-2xl mb-2"></i>
              <div className="text-sm font-semibold text-purple-700">2 Relationships</div>
            </div>
          </div>
        </div>

        {/* Original Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
            Original Table (Before Normalization)
            <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">1NF - Contains Redundancy</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 primary-key">EmployeeID</th>
                  <th className="border px-4 py-2">FirstName</th>
                  <th className="border px-4 py-2">LastName</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">DepartmentID</th>
                  <th className="border px-4 py-2">DepartmentName</th>
                  <th className="border px-4 py-2">ManagerID</th>
                  <th className="border px-4 py-2">ManagerName</th>
                  <th className="border px-4 py-2">Salary</th>
                </tr>
              </thead>
              <tbody>
                {originalData.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                    <td className="border px-4 py-2 primary-key">{row.id}</td>
                    <td className="border px-4 py-2">{row.first}</td>
                    <td className="border px-4 py-2">{row.last}</td>
                    <td className="border px-4 py-2">{row.email}</td>
                    <td className="border px-4 py-2">{row.depId}</td>
                    <td className="border px-4 py-2">{row.depName}</td>
                    <td className="border px-4 py-2">{row.mgrId}</td>
                    <td className="border px-4 py-2">{row.mgrName}</td>
                    <td className="border px-4 py-2">{row.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Issues Detected:</h4>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• DepartmentName repeated for each employee in same department</li>
              <li>• ManagerName repeated for employees with same manager</li>
              <li>• Data redundancy causing update anomalies</li>
            </ul>
          </div>
        </div>

        {/* Export Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Export Your Schema</h2>
              <p className="text-gray-600">Multiple formats for easy integration with your development workflow</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {exportOptions.map((opt, index) => (
                <ExportCard
                  key={opt.key}
                  icon={opt.icon}
                  bgColor={opt.bgColor}
                  textColor={opt.textColor}
                  title={opt.title}
                  description={opt.description}
                  buttonText={opt.buttonText}
                  onClick={() => onDownload(opt.key)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12 text-center">
        <p>© 2024 Database Normalizer - Result Tables Output</p>
        <p className="text-gray-400 text-sm mt-2">Showing converted normalized database tables with relationships</p>
      </footer>
    </div>
  );
}
