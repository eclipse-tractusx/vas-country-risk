import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Button, Dropzone, Input, Alert } from "cx-portal-shared-components";
import Dialog from "@mui/material/Dialog";

import Box from "@mui/material/Box";

import { downloadSampleCsvFile } from "../../services/files-api";
import { Snackbar } from "@mui/material";

const UploadDownloadZone = () => {
  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = useState(false);
  const [autoUp, setAutoUp] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");

  //Rating Button Handlers
  const [openRatingName, setOpenRatingName] = useState("");

  const enableUpload = () => {
    setOpen(false);
    setAutoUp(true);
  };

  const closeDialogs = () => {
    setOpen(false);
    setAutoUp(false);
  };
  const openDialog = () => {
    setOpen(!open);
  };

  const saveRatingName = (event) => {
    setOpenRatingName(event.target.value);
  };

  const dropzoneProps = {
    title: "userUpload.title",
    subtitle: "userUpload.subtitle",
    accept: "text/csv",
    getUploadParams: () => ({
      url: process.env.REACT_APP_UPLOAD_FILE,
      headers: { ratingName: openRatingName || "defaultName" },
    }),
    onChangeStatus: ({ meta }, status) => {
      if (status === "headers_received") {
        console.log(`${meta.name} uploaded`);
        setSeverity("info");
        setSeverityMessage("Your file has been validated");
      } else if (status === "aborted") {
        console.log(`${meta.name}, upload failed...`);
      } else if (status === "error_upload") {
        console.log(meta);
        console.log(status);
        setSeverity("error");
        setSeverityMessage("Your file cannot be processed");
      }
    },
    errorStatus: [
      "error_upload_params",
      "exception_upload",
      "error_upload",
      "aborted",
      "ready",
    ],
  };

  const downloadTemplate = () => {
    setDisable(true);

    downloadSampleCsvFile().then((data) => {
      let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
      csvContent += data.data + "\r\n";
      var encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "table-content.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDisable(false);
    });
  };

  return (
    <div className="upload-content">
      <Button size="small" onClick={openDialog}>
        Upload Rating
      </Button>
      <Dialog open={open} onClose={closeDialogs}>
        <Box style={{ padding: "30px" }}>
          <Input
            helperText="Helper"
            label="Label"
            placeholder="Input Rating Name"
            size={"small"}
            onChange={saveRatingName}
          ></Input>
          <div
            style={{
              background: "white",
              display: "flex",
              alignSelf: "center",
              padding: "1%",
            }}
          >
            <Button style={{ margin: "1%" }} onClick={openDialog}>
              Close
            </Button>

            <Button style={{ margin: "1%" }} onClick={enableUpload}>
              Next
            </Button>
          </div>
        </Box>
      </Dialog>

      <Dialog
        open={autoUp}
        onClose={closeDialogs}
        style={{ width: "100%", height: "70%" }}
      >
        <Alert severity={severity}>
          <span>{severityMessage}</span>
        </Alert>

        <Dropzone
          accept={dropzoneProps.accept}
          statusText={dropzoneProps.statusText}
          errorStatus={dropzoneProps.errorStatus}
          getUploadParams={dropzoneProps.getUploadParams}
          onChangeStatus={dropzoneProps.onChangeStatus}
          multiple={false}
          maxFiles={1}
        />
        <div
          style={{
            background: "white",
            display: "flex",
            alignSelf: "center",
            flexDirection: "row",
            padding: "1%",
          }}
        >
          <Button style={{ margin: "1%" }} onClick={closeDialogs}>
            Close
          </Button>
        </div>
      </Dialog>

      <div className="divider" />
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

export default UploadDownloadZone;
