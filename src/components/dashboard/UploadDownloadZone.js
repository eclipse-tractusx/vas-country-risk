import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Button, Dropzone } from "cx-portal-shared-components";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Input from "@mui/material/Input";
import { uploadCsvFile } from "../services/upload-api";
import { downloadSampleCsvFile } from "../services/files-api";
import axios from "axios";

const UploadDownloadZone = () => {
  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = React.useState(false);

  //Rating Button Handlers
  const [openRatingName, setOpenRatingName] = React.useState(false);

  //Saves CSV File
  var formData = new FormData();

  //Const for Rating name from Input
  var ratingName = "";

  const handleUpload = (files) => {
    //formData.append('file', files.file);
    //formData.append('name', files.file.name);

    localStorage.setItem("fileStore", JSON.stringify(files));
    localStorage.setItem("nameStore", files.file.name);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Save button
  const handleCloseAndSend = () => {
    formData.append("file", localStorage.getItem("fileStore"));
    formData.append("name", localStorage.getItem("nameStore"));
    formData.append("ratingname", ratingName);

    uploadCsvFile(formData);
    setOpen(false);
  };

  //Next Button from upload dialog
  const goToNextDialog = () => {
    setOpen(false);
    setOpenRatingName(true);
  };

  //Close button from ratings name dialog
  const CloseRatingNameDialog = () => {
    setOpenRatingName(false);
  };

  //Gets value from Ratings name input
  const getName = (event) => {
    const tempVal = event.target.value;
    ratingName = tempVal;
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
    <div>
      <Button className="UploadButton" size="small" onClick={handleClickOpen}>
        Upload Rating
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Dropzone
            accept=""
            errorStatus={[
              "error_upload_params",
              "exception_upload",
              "error_upload",
              "aborted",
              "ready",
            ]}
            getUploadParams={handleUpload}
            onChangeStatus={function noRefCheck() {}}
            onClick={function noRefCheck() {}}
            statusText={{
              aborted: "Aborted",
              done: "Done",
              error_file_size: "Error file size",
              error_upload: "Error_upload",
              error_upload_params: "Error_upload_params",
              error_validation: "Error validation",
              exception_upload: "Exception_upload",
              getting_upload_params: "Getting upload_params",
              headers_received: "Headers_received",
              preparing: "Preparing",
              ready: "Ready",
              rejected_file_type: "Rejected file type",
              rejected_max_files: "Rejected max files",
              removed: "Removed",
              restarted: "Restarted",
              started: "Started",
              uploading: "Uploading",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button autoFocus onClick={goToNextDialog}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openRatingName}
      >
        <h2>Please input the name of the rating</h2>

        <Input
          margin="dense"
          onChange={getName}
          inputProps={{
            type: "text",
            "aria-labelledby": "input-slider",
          }}
        />

        <DialogActions className="ButtonsSaveRatingsName">
          <Button autoFocus onClick={CloseRatingNameDialog}>
            Close
          </Button>
          <Button autoFocus onClick={handleCloseAndSend}>
            Save
          </Button>
        </DialogActions>
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
