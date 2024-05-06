// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { saveAs } from "file-saver";
import React, { useState } from "react";
import AttendanceModal from "../modals/AttendanceModal";

export const DynamicTable = ({ rowData, headerData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  if (rowData?.length === 0) {
    return (
      <div className="flex justify-center bg-[#fff] shadow-md py-4 capitalize mt-5">
        No reports available{" "}
      </div>
    );
  }

  return (
    <div className=" min-w-full  divide-gray-200 ">
      <AttendanceModal isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rowData={selectedRowData} />
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
            <tr key={rowIndex} onClick={() => handleRowClick(row)}>
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
