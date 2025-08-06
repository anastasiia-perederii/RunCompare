import React from "react";
import { FileUpload } from "primereact/fileupload";

// Компонент для завантаження CSV-файлу
const FileUploader = ({ onFileUpload }) => {
  const customUpload = ({ files }) => {
    onFileUpload(files[0]);
  };

  return (
      <div className="section">
        <h2 className="section-title">Upload CSV File</h2>
        <FileUpload
            name="file"
            accept=".csv"
            customUpload
            uploadHandler={customUpload}
            mode="basic"
            chooseLabel="Choose CSV"
        />
      </div>
  );
};

export default FileUploader;
