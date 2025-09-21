import React, { useState } from "react";

// Mock data - breakdown data
const initialData = [
  { id: 1, name: "Bug Tracker API", category: "Backend", date: "2025-09-15", status: "Running" },
  { id: 2, name: "Client Dashboard", category: "Frontend", date: "2025-07-14", status: "Pending" },
  { id: 3, name: "Auth Service", category: "Backend", date: "2024-09-10", status: "Done" },
  { id: 4, name: "CI/CD Pipeline", category: "DevOps", date: "2025-09-11", status: "Error" },
  { id: 5, name: "Mobile App UI", category: "Design", date: "2025-09-10", status: "In Progress" },
  { id: 6, name: "Payment Gateway", category: "Integration", date: "2025-09-08", status: "Running" },
  { id: 7, name: "Analytics Dashboard", category: "Frontend", date: "2024-10-05", status: "Done" },
  { id: 8, name: "User Feedback Tool", category: "Product", date: "2025-09-03", status: "Pending" },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setData(sortedData);
  };

  return (
    <div className="table-section">
      <h3 className="table-title">Recent Activity</h3>
      <table className="data-table">
        <thead>
          <tr> 
            <th>#</th>
            <th onClick={() => sortData("name")} style={{ cursor: "pointer" }}>  
              Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Category</th>
            <th onClick={() => sortData("date")} style={{ cursor: "pointer" }}>
              Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
