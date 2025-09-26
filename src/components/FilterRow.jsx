import React from "react";

export default function FilterRow({ headers, columnFilters, onChange }) {
  return (
    <tr>
      {headers.map((header) => (
        <th key={header}>
          <input
            type="text"
            placeholder="Type to Filter..."
            value={columnFilters[header] || ""}
            onChange={(e) => onChange(header, e.target.value)}
            style={{ width: "90%", padding: 4 }}
          />
        </th>
      ))}
      <th />
    </tr>
  );
}
