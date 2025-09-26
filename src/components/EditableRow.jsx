import React, { useState } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";

export default function EditableRow({ rowData, onCancel, onSave }) {
  const [editData, setEditData] = useState(rowData);

  const handleChange = (e, index) => {
    const newData = [...editData];
    newData[index] = e.target.value;
    setEditData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editData);
  };

  return (
    <tr>
      {editData.map((value, i) => (
        <td key={i} style={{ padding: "8px" }}>
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e, i)}
            style={{ width: "90%" }}
          />
        </td>
      ))}
      <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
        <button onClick={handleSubmit} title="Save" style={{ marginRight: 8 }}>
          <BsCheckLg color="green" />
        </button>
        <button onClick={onCancel} title="Cancel">
          <BsXLg color="red" />
        </button>
      </td>
    </tr>
  );
}
