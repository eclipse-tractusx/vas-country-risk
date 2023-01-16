import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button, Input } from "cx-portal-shared-components";
import {
  getReportsByCompanyUser,
  saveReports,
  deleteReport,
  updateReports,
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
import Alert from "@mui/material/Alert";
import { ReloadContext } from "../../../contexts/refresh";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

import { IconButton } from "cx-portal-shared-components";
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
  const [severityMessageAlert, setSeverityMessageAlert] = useState("");

  //Gets Current Roles for the User
  const role = companyUser.roles;

  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");
  const [reportType, setReportType] = useState(false);
  const [editDeleteShareActive, setEditDeleteShareActive] = useState(true);

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
            setSeverityMessageAlert("Report saved sucessfully!");
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
    setErrorTrigger(true);
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
    if (code.status === 204) {
      setOpenAlert(true);
      setSeverityAlert("success");
      setSeverityMessageAlert(successMessage);
      timerFunction();
    } else if (code === 401) {
      setOpenAlert(true);
      setSeverityAlert("error");
      setSeverityMessageAlert(errorMessage);
      timerFunction();
    } else if (code === 500 || code === 400) {
      setOpenAlert(true);
      setSeverityAlert("error");
      setSeverityMessageAlert("Wrong Request Type!");
      timerFunction();
    }
  };

  const hideAlert = () => {
    setSeverityAlert("");
    setSeverityMessageAlert("");
    setOpenAlert(!openAlert);
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
          icon={<SaveOutlinedIcon />}
          label="Save"
          onClick={onClickActionDeleteUpdate(
            params.id,
            "Save Changes",
            "Do you want to save the changes to this Report?"
          )}
          disabled={editDeleteShareActive}
        />,
      ],
    },
    {
      field: "delete",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={onClickActionDeleteUpdate(
            params.id,
            "Delete Report",
            "Do you want to delete this Report?"
          )}
          disabled={editDeleteShareActive}
        />,
      ],
    },
    {
      field: "share",
      type: "actions",
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ShareOutlinedIcon />}
          label="Share"
          onClick={onClickShare(params.id)}
          disabled={editDeleteShareActive}
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
        setSeverityMessageAlert("");
        setOpenAlert(false);
      }, 4000)
    );
  };

  return (
    <div className="reportdiv">
      <div className="alertDialog">
        <Collapse in={openAlert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={hideAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={severityAlert}
          >
            <span>{severityMessageAlert}</span>
          </Alert>
        </Collapse>
      </div>
      <div className="reports-header">
        <TextField
          InputProps={{
            style: { fontSize: 12 },
            readOnly: true,
            disableUnderline: true,
          }} //Block edit on textfield
          className="formReports"
          variant="filled"
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
        columns={role.includes("Company Admin") ? columnsUser : columnsUser}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        selectionModel={selectionModel}
        autoHeight={!report || report.length ? true : false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableColumnMenu={true}
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

      <Dialog open={open} onClose={closeDialogs} className="Dialog-Expand">
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
                disabled={reportType}
              />
            </RadioGroup>
          </div>

          <FormLabel className="SecondLabel" component="legend">
            Please input the name of the Report
          </FormLabel>

          <Input
            data-testid="inputReportName"
            className="input-report"
            error={errorTrigger}
            //helperText={"ERROR"}
            placeholder="Max 32 Characters"
            size={"small"}
            onChange={handleInputReportChange}
          ></Input>
          <Alert severity={severity}>
            <span>{severityMessage}</span>
          </Alert>
          <Button className="btn-close" onClick={closeDialogs}>
            Close
          </Button>
          <Button
            className="btn-save"
            onClick={closeDialogsAndSave}
            disabled={validateSave}
          >
            Save
          </Button>
        </div>
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
    </div>
  );
};

export default Reports;
