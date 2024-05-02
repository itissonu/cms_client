// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { saveAs } from "file-saver";
import React, { useState } from "react";

export const DynamicTable = ({ rowData, headerData }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = rowData?.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleDownloadCSV = () => {
//     const csv = [
//       headerData.map((header) => header.label).join(","),
//       ...currentItems.map((row) =>
//         headerData.map((header) => row[header.field]).join(",")
//       ),
//     ].join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     saveAs(blob, "table_data.csv");
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const tableData = rowData.map((row, index) => {
//       const rowDataWithIndex = { "Sl. No.": index + 1 };
//       headerData.forEach((header) => {
//         rowDataWithIndex[header.label] = row[header.field];
//       });
//       return rowDataWithIndex;
//     });
//     const tableHeaders = [
//       "Sl. No.",
//       ...headerData.map((header) => header.label),
//     ];

//     // Add a title to the PDF
//     doc.setFontSize(16);
//     doc.text("Report Table", 20, 20);

//     // Add a date to the PDF
//     const date = new Date().toLocaleDateString();
//     doc.setFontSize(12);
//     doc.text(`Date: ${date}`, 20, 30);

//     // Add the table content to the PDF using autoTable
//     doc.autoTable({
//       startY: 40,
//       head: [tableHeaders],
//       body: tableData.map((row) => Object.values(row)),
//       styles: { cellPadding: 2, fontSize: 10 },
//       headStyles: { fillColor: [230, 230, 230] },
//       alternateRowStyles: { fillColor: [240, 240, 240] },
//     });

//     // Save the PDF
//     doc.save("table_data.pdf");
//   };

  if (rowData?.length === 0) {
    return (
      <div className="flex justify-center bg-[#fff] shadow-md py-4 capitalize mt-5">
        No reports available{" "}
      </div>
    );
  }

  return (
    <div className=" min-w-full  divide-gray-200 ">
      {/* <div className="flex justify-end gap-4 mb-3">
        <button
        //   onClick={handleDownloadCSV}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          Download CSV
        </button>
        <button
        //   onClick={handleDownloadPDF}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div> */}
      <table className="min-w-full divide-y  p-2">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sl. No.
            </th>
            {headerData?.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rowData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rowIndex + 1}
              </td>
              {headerData.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{ whiteSpace: "pre-line" }}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[header?.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
