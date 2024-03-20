/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
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
import "./dialog-upload.scss";

import {
  DialogHeader,
  DialogContent,
  Input,
  Button,
  Dialog,
  DialogActions,
  DropArea,
  PageSnackbar,
} from "@catena-x/portal-shared-components";
import Tooltip from "@mui/material/Tooltip";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
import DropZone from "./DropZoneComponent/DropZone";

import { uploadCsvFile } from "../../services/upload-api";

const UploadDownloadZone = () => {
  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisable] = useState(false);
  const [autoUp, setAutoUp] = useState(false);

  const [severity, setSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarMessageTitle, setSnackBarMessageTitle] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
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
  const [errorTrigger, setErrorTrigger] = React.useState(false);

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
    setOpenSnackBar(false);
    setOpen(false);
    setAutoUp(false);
    setValidateSave(true);
    setSnackBarMessage("");
    setSnackBarMessageTitle("");
    setSeverity("");
  };
  const openDialog = () => {
    setOpen(!open);
    setValidateSave(true);
    setErrorTrigger(false);
  };

  const saveRatingName = (event) => {
    setSeverity("");

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

  //Upload CSV
  const triggerUploadCsv = (file) => {
    if (file[0]) {
      uploadCsvFile(
        file[0],
        openRatingName || "defaultName",
        date,
        valueType,
        companyUser
      )
        .then((res) => {
          if (res.status === 200) {
            setOpenSnackBar(true);
            setSeverity("success");
            updateReload(!reload);
            setSnackBarMessage("Your rating has been uploaded");
            setSnackBarMessageTitle("Success");
          }
        })
        .catch((response) => {
          if (response.response.status === 400) {
            setOpenSnackBar(true);
            setSeverity("error");
            setSnackBarMessage(
              "Rating name already exists. Please chose a different name"
            );
            setSnackBarMessageTitle("Error");
          } else if (response.response.status === 406) {
            setOpenSnackBar(true);
            setSeverity("error");
            setSnackBarMessage("Invalid Rating please check all the fields");
            setSnackBarMessageTitle("Error");
          } else {
            setOpenSnackBar(true);
            setSeverity("error");
            setSnackBarMessage("Error inserting the file");
            setSnackBarMessageTitle("Error");
          }
        });
    }
  };

  return (
    <div className="upload-content">
      <Button size="small" onClick={openDialog}>
        Upload Rating
      </Button>

      <Dialog
        open={open}
        onClose={closeDialogs}
        className="First-Dialog"
        maxWidth="md"
      >
        <DialogHeader title="Upload a Rating" />
        <DialogContent className="content-expand">
          <div className="Dialog-Expand-Div">
            <FormLabel className="FirstLabel" component="legend">
              Select availability
              <Tooltip title="You need 'Company Admin' permissions to make this report available for the company.">
                <InfoOutlinedIcon
                  fontSize="small"
                  color="primary"
                  style={{ marginLeft: 4 }}
                />
              </Tooltip>
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
                label={
                  <>
                    {"Please write your rating name"}
                    <span style={{ color: "red" }}> *</span>
                  </>
                }
                data-testid="inputelement"
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
            <DropZone
              onChange={triggerUploadCsv}
              acceptFormat={{
                "application/csv": [".csv"],
              }}
              maxFilesToUpload={1}
              maxFileSize={819200}
              data-testid="dropzonetest"
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

      <PageSnackbar
        autoClose={true}
        open={openSnackBar}
        severity={severity}
        title={snackBarMessageTitle}
        description={snackBarMessage}
        showIcon={true}
      ></PageSnackbar>
    </div>
  );
};

export default UploadDownloadZone;
