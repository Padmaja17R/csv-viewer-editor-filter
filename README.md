# CSV Viewer, Editor and Filter

A web-based tool to upload, view, edit, filter, and download CSV files. This lightweight app is built using **React** and **PapaParse**, allowing easy manipulation of tabular CSV data directly in your browser.

---

## Features

- Upload `.csv` files via file input
- Parse CSV files using [PapaParse](https://www.papaparse.com/)
- Display CSV data in an editable table
- Filter data per column using flexible input fields
- Edit rows inline
- Download filtered/edited CSV data
- Navigate back to file upload page

---

## Project Structure

CSV-VIEWER-EDITOR-FILTER/
├── components/
│ ├── CSVTable.jsx # Main table component
│ ├── EditableRow.jsx # Handles row editing
│ └── FilterRow.jsx # Handles filtering inputs per column
├── utils/
│ └── csvHelpers.js # CSV-related utility functions
├── App.jsx # Main application logic
├── App.css # Global styles
├── index.css # Base styles
├── main.jsx # Entry point
├── index.html # HTML template
├── package.json # Project metadata and dependencies
├── vite.config.js # Vite configuration
└── README.md # You're reading this!

---

## Tech Stack

- **React** (frontend library)
- **Vite** (build tool)
- **PapaParse** (CSV parsing)
- **JavaScript (ES6+)**
- **CSS Modules**

---

Utility Functions (csvHelpers.js)
parseCSV() – Converts uploaded file content into an array of objects.

convertToCSV() – Converts filtered data back to CSV format for downloading.

----
