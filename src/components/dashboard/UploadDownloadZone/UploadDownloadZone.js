import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import { Button, Dropzone, Input, Alert } from "cx-portal-shared-components";
import Dialog from "@mui/material/Dialog";
import UserService from "../../services/UserService";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { downloadSampleCsvFile } from "../../services/files-api";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReloadContext } from "../../../contexts/refresh";

const UploadDownloadZone = () => {
  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = useState(false);
  const [autoUp, setAutoUp] = useState(false);

  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");
  const { companyUser } = useContext(CompanyUserContext);
  const { reload, updateReload } = useContext(ReloadContext);

  //Radio Button Role Enabler
  const [ratingType, setRatingType] = useState(false);

  //Rating Button Handlers
  const [openRatingName, setOpenRatingName] = useState("");
  const [valueType, setType] = useState("Custom");

  //Years Calculation [Current date - 2000]
  const now = new Date().getUTCFullYear();
  const updateDate = now - 1999;
  const years = Array(now - (now - updateDate))
    .fill("")
    .map((v, idx) => now - idx);

  //Date Currently Selected
  const [date, setDate] = useState("");

  //Const for triggering error on Dialog Text Field
  const [errorTrigger, setErrorTrigger] = React.useState(true);

  //Validates if next button is active
  const [validateSave, setValidateSave] = useState(true);

  //Gets Current Roles for the User
  const role = companyUser.roles;

  useEffect(() => {
    setDate(now);
    role.includes("Company Admin") ? setRatingType(false) : setRatingType(true);
  }, [role]);

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const enableUpload = () => {
    setOpen(false);
    setAutoUp(true);
    setErrorTrigger(true);
  };

  const closeDialogs = () => {
    setOpen(false);
    setAutoUp(false);
    setValidateSave(true);
    setSeverityMessage("");
    setSeverity("");
  };
  const openDialog = () => {
    setOpen(!open);
    setValidateSave(true);
  };

  const saveRatingName = (event) => {
    setSeverity("");
    setSeverityMessage("");
    if (event.target.value.length > 32 || event.target.value.length === 0) {
      setErrorTrigger(true);
      setOpenRatingName(null);
      setValidateSave(true);
    } else {
      setErrorTrigger(false);
      setOpenRatingName(event.target.value);
      setValidateSave(false);
    }
  };

  //Handler for Checkbox
  const handleChangeCheckbox = (event) => {
    setType(event.target.value);
  };

  const dropzoneProps = {
    title: "userUpload.title",
    subtitle: "userUpload.subtitle",
    accept: "text/csv",
    getUploadParams: () => ({
      url: process.env.REACT_APP_UPLOAD_FILE,

      fields: {
        name: companyUser.name,
        email: companyUser.email,
        companyName: companyUser.companyName,
      },
      headers: {
        ratingName: openRatingName || "defaultName",
        Authorization: `Bearer ${UserService.getToken()}`,
        year: date,
        type: valueType,
      },
    }),
    onChangeStatus: ({ meta }, status) => {
      if (status === "headers_received") {
        console.log(`${meta.name} uploaded`);
        setSeverity("info");
        setSeverityMessage("Your rating has been uploaded");
        updateReload(!reload);
      } else if (status === "aborted") {
        console.log(`${meta.name}, upload failed...`);
      } else if (status === "error_upload") {
        console.log(meta);
        console.log(status);
        setSeverity("error");
        setSeverityMessage(
          "Rating name already exists. Please chose a different name"
        );
      } else {
        console.log("error");
        console.log(meta);
        console.log(status);
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

    downloadSampleCsvFile(UserService.getToken(), companyUser).then((data) => {
      let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
      csvContent += data.data + "\r\n";
      var encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Country Risk Rating Template.csv");
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
      <Dialog open={open} onClose={closeDialogs} className="First-Dialog">
        <div className="Dialog-Expand-Div">
          <FormLabel className="FirstLabel" component="legend">
            Select availability
          </FormLabel>
          <div className="CheckBox-Div">
            <RadioGroup
              defaultValue="Custom"
              className="CheckBox-Div-Radio"
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={handleChangeCheckbox}
            >
              <FormControlLabel
                value="Custom"
                control={<Radio />}
                label="Only For me"
              />
              <FormControlLabel
                value="Company"
                control={<Radio />}
                label="For the company"
                disabled={ratingType}
              />
            </RadioGroup>
          </div>
          <div className="form-year">
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-label">
                Select a Year
              </InputLabel>
              <Select
                value={date}
                onChange={handleChange}
                label="Year"
                data-testid="yearselect"
              >
                {Array.isArray(years)
                  ? years.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })
                  : []}
              </Select>
            </FormControl>
          </div>
          <Input
            data-testid="inputelement"
            label="Please write your rating name"
            placeholder="Insert the Rating Name"
            size={"small"}
            error={errorTrigger}
            onChange={saveRatingName}
          ></Input>
          <Button
            data-testid="closeFirst"
            style={{ margin: "1%" }}
            onClick={openDialog}
          >
            Close
          </Button>
          <Button style={{ margin: "1%" }} onClick={enableUpload} disabled={validateSave}>
            Next
          </Button>
        </div>
      </Dialog>

      <Dialog open={autoUp} onClose={closeDialogs} className="Second-Dialog">
        <div className="Second-Expand-Div">
          <Alert severity={severity}>
            <span>{severityMessage}</span>
          </Alert>

          <Dropzone
            data-testid="dropzonetest"
            accept={dropzoneProps.accept}
            statusText={dropzoneProps.statusText}
            errorStatus={dropzoneProps.errorStatus}
            getUploadParams={dropzoneProps.getUploadParams}
            onChangeStatus={dropzoneProps.onChangeStatus}
            multiple={false}
            maxFiles={1}
          />

          <Button style={{ margin: "1%" }} onClick={closeDialogs}>
            Close
          </Button>
        </div>
      </Dialog>

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
