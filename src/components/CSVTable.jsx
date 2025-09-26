import React from "react";
import EditableRow from "./EditableRow";
import { BsPencilSquare } from "react-icons/bs";
import FilterRow from "./FilterRow";

export default function CSVTable({
  csvData,
  filteredData,
  editRow,
  setEditRow,
  saveEdit,
  columnFilters,
  setColumnFilters,
}) {
  const startEdit = (index) => setEditRow(index);
  const cancelEdit = () => setEditRow(null);

  const handleFilterChange = (header, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [header]: value.toLowerCase(),
    }));
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", margin: "20px auto", width: "fit-content" }}>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {csvData[0].map((header, i) => (
              <th key={i} style={{ padding: "8px" }}>{header}</th>
            ))}
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
          <FilterRow headers={csvData[0]} columnFilters={columnFilters} onChange={handleFilterChange} />
        </thead>
        <tbody>
          {filteredData.slice(1).map((row, idx) => {
            const actualIndex = csvData.indexOf(row);
            if (editRow === actualIndex) {
              return (
                <EditableRow
                  key={actualIndex}
                  headers={csvData[0]}
                  rowData={row}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              );
            }
            return (
              <tr key={actualIndex}>
                {row.map((cell, i) => (
                  <td key={i} style={{ padding: "8px" }}>{cell}</td>
                ))}
                <td style={{ textAlign: "center", cursor: "pointer" }}>
                  <BsPencilSquare
                    color="blue"
                    size={20}
                    onClick={() => startEdit(actualIndex)}
                    title="Edit record"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
