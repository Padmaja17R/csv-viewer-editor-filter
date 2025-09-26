export const convertToCSV = (data) =>
  data
    .map((row) =>
      row
        .map((cell) =>
          cell.includes('"') || cell.includes(",") ? `"${cell.replace(/"/g, '""')}"` : cell
        )
        .join(",")
    )
    .join("\n");
