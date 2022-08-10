import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Button, Dropzone } from "cx-portal-shared-components";
import { downloadSampleCsvFile } from "../services/files-api";

const DownloadBut = () => {

  const [disabled, setDisable] = React.useState(false);

  const downloadTemplate = () => {
    setDisable(true);
    const newArray = [];

    downloadSampleCsvFile().then((data) => {
      var blob = new Blob([data], { type: "text/csv" });
      var url = URL.createObjectURL(blob);
      window.open(url);
      setDisable(false);
    });
  };

  return (
    <div>
      <Button
        className="DownloadButton"
        size="small"
        disabled={disabled}
        onClick={downloadTemplate}
      >
        Download Template
      </Button>
    </div>
  );
};

export default DownloadBut;
