import React, { useState } from "react";
import { FiFile } from "react-icons/fi";
import Papa from "papaparse";
import CSVTable from "./components/CSVTable";
import { convertToCSV } from "./utils/csvHelpers";
import "./App.css";

export default function App() {
  const [showTable, setShowTable] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [columnFilters, setColumnFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
        setEditRow(null);
        setColumnFilters({});
        setIsLoading(false);
        setShowTable(true);
      },
      skipEmptyLines: true,
    });
  };

  const saveEdit = (updatedRow) => {
    const updatedData = [...csvData];
    updatedData[editRow] = updatedRow;
    setCsvData(updatedData);
    setEditRow(null);
  };

  const filteredData = csvData.length > 0
    ? [
        csvData[0],
        ...csvData.slice(1).filter(row =>
          row.every((cell, idx) => {
            const header = csvData[0][idx];
            const filterValue = columnFilters[header] || "";
            return cell.toLowerCase().includes(filterValue);
          })
        )
      ]
    : [];

  const downloadCSV = () => {
    if (!filteredData.length) return;
    const csvString = convertToCSV(filteredData);
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="center-container">
      {!showTable && (
        <>
          <h1 className="main-heading">CSV Viewer, Editor and Filter</h1>
          <p className="subtext">
            Upload, view, edit, filter and read CSV files. Whether you need to make quick edits or just view your CSV data, or just filter those set of data you need and download it, this CSV viewer, editor, filter has you covered.
          </p>
          <div className="file-upload-box">
            <div className="csv-icon">
              <FiFile size={48} color="#2563eb" />
            </div>
            <label htmlFor="csv-upload" className="choose-file-btn">Choose CSV File
              <input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>
          {isLoading && (
            <div className="loading-message">
              Hang tight — we're loading your table...
            </div>
          )}
        </>
      )}
      {showTable && csvData.length > 0 && (
        <>
          <div className="table-actions-row">
            <button className="back-btn" onClick={() => { setShowTable(false); setCsvData([]); }}>
               <span style={{fontSize: '1.3em', display: 'flex', alignItems: 'center'}}>&larr;</span>Back
            </button>
            <div className="download-btn-container">
              <button onClick={downloadCSV} className="download-btn">
                Download Filtered CSV
              </button>
            </div>
          </div>
          <CSVTable
            csvData={csvData}
            filteredData={filteredData}
            editRow={editRow}
            setEditRow={setEditRow}
            saveEdit={saveEdit}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </>
      )}
    </div>
  );
}
