/********************************************************************************
 * Copyright (c) 2022,2023 BMW Group AG
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import {
  Button,
  Dropzone,
  Input,
  Alert,
  DialogHeader,
  DialogContent,
  DialogActions,
} from "cx-portal-shared-components";
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
    setErrorTrigger(true);
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
    accept: "text/csv,application/vnd.ms-excel",
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

    onChangeStatus: ({ meta }, file, status, allFiles) => {
      if (status[0].xhr) {
        if (status[0].xhr.status === 200) {
          setSeverity("info");
          setSeverityMessage("Your rating has been uploaded");
          updateReload(!reload);
        } else if (meta.status === "error_upload") {
          if (status[0].xhr.status === 400) {
            setSeverity("error");
            setSeverityMessage(
              "Rating name already exists. Please chose a different name"
            );
          } else if (status[0].xhr.status === 406) {
            setSeverity("error");
            setSeverityMessage("Invalid Rating please check all the fields");
          } else {
            setSeverity("error");
            setSeverityMessage("Unexpected error");
          }
        } else if (meta.status === "exception_upload") {
          setSeverity("error");
          setSeverityMessage("Unexpected error");
        }
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

      <Dialog
        open={open}
        onClose={closeDialogs}
        maxWidth="lg"
        className="First-Dialog"
      >
        <DialogHeader title="Upload an Rating" />
        <DialogContent className="content-expand">
          <div className="Dialog-Expand-Div">
            <FormLabel className="FirstLabel" component="legend">
              Select availability
            </FormLabel>
            <div className="CheckBox-Div">
              <RadioGroup
                value={valueType}
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
            <div className="inputrating">
              <Input
                data-testid="inputelement"
                label="Please write your rating name"
                placeholder="Insert the Rating Name"
                size={"small"}
                error={errorTrigger}
                onChange={saveRatingName}
              ></Input>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={openDialog}
            data-testid="closeFirst"
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={enableUpload}
            disabled={validateSave}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={autoUp} onClose={closeDialogs} className="Second-Dialog">
        <DialogHeader
          intro="Please select or drop the file in the dropzone"
          title="Upload the File"
        />
        <div className="Second-Expand-Div">
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              className="btn-close-upload-second"
              data-testid="closeSecond"
              onClick={closeDialogs}
            >
              Close
            </Button>
          </DialogActions>
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
