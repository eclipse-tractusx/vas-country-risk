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
import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";

import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import {
  Alert,
  Button,
  DialogActions,
  DialogHeader,
  Input,
  PageSnackbar,
  Dialog,
} from "@catena-x/portal-shared-components";
import {
  getReportsByCompanyUser,
  saveReports,
} from "../../services/reports-api";
import UserService from "../../services/UserService";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { RangesContext } from "../../../contexts/ranges";
import { RatesContext } from "../../../contexts/rates";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { Report } from "../../model/Report";
import { ReloadContext } from "../../../contexts/refresh";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ShareReport from "../ShareReport/ShareReport";
import DeleteUpdateComponent from "../DeleteUpdateComponent/DeleteUpdateComponent";
import { DeleteOrUpdate } from "../../model/DeleteOrUpdate";

const Reports = () => {
  const [selectionModel, setSelectionModel] = useState([]);

  //Context to get current selected country
  const { countryS } = useContext(CountryContext);
  const { ranges } = useContext(RangesContext);
  const { prefixIds } = useContext(RatesContext);

  //Context to save report data
  const { updateReport } = useContext(ReportContext);

  const [report, setReport] = useState([]);

  const { companyUser } = useContext(CompanyUserContext);

  const [open, setOpen] = React.useState(false);

  const [openShareReport, setOpenShareReport] = React.useState(false);

  const { reload, updateReload } = useContext(ReloadContext);

  const [valueType, setType] = useState("Custom");

  const [valueTextField, setValueTextField] = React.useState(
    "Select a Report Bellow"
  );

  //Const for triggering error on Dialog Text Field
  const [errorTrigger, setErrorTrigger] = React.useState(true);

  //Const for triggering error on Dialog Text Field
  const [valueDialogTextField, setValueDialogTextField] = React.useState(null);

  //Warning Dialog
  const [openWarning, setOpenWarning] = useState(false);

  //Alert trigger consts Delete/Save
  const [severityAlert, setSeverityAlert] = useState("");

  //Gets Current Roles for the User
  const role = companyUser.roles;

  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");
  const [reportType, setReportType] = useState(false);
  const [editDeleteShareActive, setEditDeleteShareActive] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarMessageTitle, setSnackBarMessageTitle] = useState("");

  //Open Error/Sucess Dialog
  const [openAlert, setOpenAlert] = React.useState(false);

  //Const used to pass Delete/Update Information to the other component
  const [deleteUpdateData, setDeleteUpdateData] = useState("");

  const [timer, setTimer] = React.useState(0);

  useEffect(() => {
    role.includes("Company Admin") ? setReportType(false) : setReportType(true);
  }, [role]);

  //Get Reports By user
  useEffect(() => {
    getReportsByCompanyUser(UserService.getToken(), companyUser).then(
      (response) => {
        setReport(response || []);
      }
    );
  }, [reload]);

  const closeDialogs = () => {
    setValidateSave(true);
    setOpen(false);
    setOpenWarning(false);
    setOpenShareReport(false);
  };

  //Close Dialog function for DeleteAndUpdateComponent
  const closeDialogsDeleteAndUpdate = (code, successMessage, errorMessage) => {
    validateUpdateDeleteResponseCode(code, successMessage, errorMessage);
    closeDialogs();
    if (deleteUpdateData.operation !== "Save Changes") {
      updateReload(!reload);
    }
  };

  //Func to create a new Report Object
  const newReportFunc = (operation, id) => {
    const list = [];
    list.push(
      { name: "Range", objectValue: ranges },
      { name: "Country", objectValue: countryS === "none" ? [] : countryS },
      { name: "Ratings", objectValue: prefixIds }
    );

    let idObj;

    if (operation === "Save Changes" || "Delete Report") {
      idObj = id ? id : null;
    } else if (operation === "Save Report") {
      idObj = null;
    }

    const newReport = new Report(
      idObj ? idObj : null,
      valueDialogTextField,
      companyUser.name,
      companyUser.companyName,
      companyUser.email,
      valueType,
      list
    );

    return newReport;
  };

  const closeDialogsAndSave = () => {
    //Creates a Report Object (Operation, ID)
    const newReport = newReportFunc("Save Report", null);

    if (newReport.id === null) {
      saveReports(UserService.getToken(), companyUser, newReport)
        .then((res) => {
          setOpen(false);
          updateReload(!reload);
          if (res.status === 200) {
            setOpenAlert(true);
            setSeverityAlert("success");
            setSeverity("success");
            setSnackBarMessageTitle("Success");
            setSnackBarMessage("Report Saved Successfully");
          }
        })
        .catch((response) => {
          if (response.response.status === 400) {
            setSeverity("error");
            setSeverityMessage(response.response.data.message);
            setOpen(true);
            setValidateSave(false);
          }
        });
    }
    closeDialogs();
    timerFunction();
  };

  const setMessage = () => {
    setReportType(true);
    setSeverity("warning");
    setSeverityMessage("Custom Rating Selected");
  };

  const openDialog = () => {
    setSeverity("");
    setSeverityMessage("");
    setOpen(!open);
    setErrorTrigger(false);
    setValueDialogTextField(null);

    const customSelection = prefixIds.find(
      (element) => element.type === "Custom"
    );

    if (customSelection) {
      setMessage();
    }
  };

  //Handler for Checkbox
  const handleChangeCheckbox = (event) => {
    setType(event.target.value);
  };

  //Handler for Input Report name in Dialog Component
  const handleInputReportChange = (event) => {
    setSeverity("");
    setSeverityMessage("");
    if (event.target.value.length > 32 || event.target.value.length === 0) {
      setErrorTrigger(true);
      setValueDialogTextField(null);
      setValidateSave(true);
    } else {
      setErrorTrigger(false);
      setValueDialogTextField(event.target.value);
      setValidateSave(false);
    }
  };

  //Handler for textvalue in main report component
  const handleChangeInput = (event) => {
    setValueTextField(event.target.value);
  };

  const [valueRadioChecked, setValueRadioChecked] = useState(false);

  const [validateSave, setValidateSave] = useState(true);

  const clearButton = () => {
    setSelectionModel([]);
    setValueTextField("Select a Report Bellow");
    setValueRadioChecked(true);
    updateReport("");
    updateReload(!reload);
    setEditDeleteShareActive(true);
  };

  const handleChange = () => {
    setValueRadioChecked(false);
  };

  const onClickShare = (id) => () => {
    setOpenShareReport(true);
  };

  const onClickActionDeleteUpdate =
    (id, operation, doubleCheckMessage) => () => {
      //Creates a Report Object (Operation, ID)
      const newReport = newReportFunc(operation, id);

      //Creates an Object with ID, Operation Type (Update/Delete) and Message
      const newDeleteOrUpdate = new DeleteOrUpdate(
        id ? id : null,
        operation,
        doubleCheckMessage,
        newReport
      );

      setDeleteUpdateData(newDeleteOrUpdate);
      setOpenWarning(true);
    };

  const validateUpdateDeleteResponseCode = (
    code,
    successMessage,
    errorMessage
  ) => {
    setSnackBarMessage();

    if (code.status === 204) {
      setOpenAlert(true);
      setSeverityAlert("success");
      timerFunction();
      setSnackBarMessage(successMessage);
      setSeverity("success");
      setSnackBarMessageTitle("Success");
    } else if (code === 401) {
      setOpenAlert(true);
      setSeverityAlert("error");
      timerFunction();
      setSnackBarMessage(errorMessage);
      setSeverity("error");
      setSnackBarMessageTitle("Error");
    } else if (code === 500 || code === 400) {
      setOpenAlert(true);
      setSeverityAlert("error");
      setSnackBarMessage(errorMessage);
      setSeverity("error");
      setSnackBarMessageTitle("Error");
      timerFunction();
    }
  };

  const columnsUser = [
    {
      field: "radiobutton",
      headerName: (
        <Radio
          data-testid="radioClear"
          onChange={clearButton}
          checked={valueRadioChecked}
        />
      ),
      width: 120,
      renderCell: (params) => (
        <Radio
          onChange={handleChange}
          checked={selectionModel[0] === params.id}
          value={params.id}
          data-testid="radio-choose-report"
        />
      ),
      sortable: false,
    },

    {
      field: "reportName",
      headerName: "Report Name",
      width: 150,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "update",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <SaveOutlinedIcon
              color={editDeleteShareActive ? "disabled" : "primary"}
            />
          }
          label="Save"
          onClick={onClickActionDeleteUpdate(
            params.id,
            "Save Changes",
            "Do you want to save the changes to this Report?"
          )}
          disabled={editDeleteShareActive}
          data-testid={"saveIcon"}
          color="primary"
        />,
      ],
    },
    {
      field: "delete",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <DeleteIcon
              color={editDeleteShareActive ? "disabled" : "primary"}
            />
          }
          label="Delete"
          onClick={onClickActionDeleteUpdate(
            params.id,
            "Delete Report",
            "Do you want to delete this Report?"
          )}
          disabled={editDeleteShareActive}
          data-testid={"deleteIcon"}
        />,
      ],
    },
    {
      field: "share",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <ShareOutlinedIcon
              color={editDeleteShareActive ? "disabled" : "primary"}
            />
          }
          label="Share"
          onClick={onClickShare(params.id)}
          disabled={editDeleteShareActive}
          data-testid={"shareIcon"}
        />,
      ],
    },
  ];

  const timerFunction = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setSeverityAlert("");
        setOpenAlert(false);
      }, 4000)
    );
  };

  return (
    <div className="reportdiv">
      <div className="reports-header">
        <TextField
          InputProps={{
            style: { fontSize: 12 },
            readOnly: true,
            disableUnderline: true,
            hiddenLabel: false,
          }} //Block edit on textfield
          className="formReports"
          variant="standard"
          value={valueTextField}
          onChange={handleChangeInput}
          size={"12px"}
        ></TextField>
        <div className="divider" />
        <Button size="small" className="ButtonSave" onClick={openDialog}>
          Save Reports
        </Button>
      </div>
      <DataGrid
        className="table"
        rows={report}
        columns={columnsUser}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        selectionModel={selectionModel}
        autoHeight={!report || report.length ? true : false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableColumnMenu={true}
        columnBuffer={columnsUser.length}
        onSelectionModelChange={(newSelectionModel) => {
          handleChange();
          setSelectionModel(newSelectionModel);
          const selectionSet = new Set(newSelectionModel);
          const result = report.filter((s) => selectionSet.has(s.id));
          setValueDialogTextField(result.length ? result[0].reportName : "");
          setValueTextField(result.length ? result[0].reportName : "");
          updateReport(result.length ? result[0] : "");
          setEditDeleteShareActive(result.length ? false : true);
        }}
      />

      <Dialog
        className="warning"
        aria-labelledby="customized-dialog-title"
        open={openWarning}
        onClose={closeDialogs}
      >
        <DeleteUpdateComponent
          deleteUpdateData={deleteUpdateData}
          closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
          closeDialogs={closeDialogs}
        />
      </Dialog>

      <Dialog
        maxWidth="md"
        open={open}
        onClose={closeDialogs}
        className="Dialog-Expand"
      >
        <div className="dialog-header">
          <DialogHeader
            className="dialog-header"
            title="Save new Report"
            intro="Create a new report according the select values"
          />
        </div>
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
                disabled={reportType}
              />
            </RadioGroup>
          </div>
          <div className="input-report">
            <Input
              label={
                <>
                  {"Report name"}
                  <span style={{ color: "red" }}> *</span>
                </>
              }
              data-testid="inputReportName"
              className=""
              error={errorTrigger}
              //helperText={"ERROR"}
              placeholder="Report name"
              size={"small"}
              onChange={handleInputReportChange}
            ></Input>
            <Alert severity={severity}>
              <span>{severityMessage}</span>
            </Alert>
          </div>
        </div>

        <DialogActions>
          <Button
            className="btn-close"
            variant="outlined"
            onClick={closeDialogs}
          >
            Close
          </Button>
          <Button
            className="btn-save"
            onClick={closeDialogsAndSave}
            disabled={validateSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        className="share-dialog-expand"
        open={openShareReport}
        onClose={closeDialogs}
      >
        <ShareReport
          closeDialogs={closeDialogs}
          closeDialogsDeleteAndUpdate={closeDialogsDeleteAndUpdate}
        ></ShareReport>
      </Dialog>
      <PageSnackbar
        autoClose={false}
        open={severityAlert}
        severity={severity}
        title={snackBarMessageTitle}
        description={snackBarMessage}
        showIcon={true}
      ></PageSnackbar>
    </div>
  );
};

export default Reports;
