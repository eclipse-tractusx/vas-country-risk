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

  //Delete Boolean
  const [selectedID, setSelectedID] = useState(null);

  //Delete Warning
  const [severityDelete, setSeverityDelete] = useState("");
  const [severityMessageDelete, setSeverityMessageDelete] = useState("");

  //Gets Current Roles for the User
  const role = companyUser.roles;

  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");
  const [reportType, setReportType] = useState(false);
  const [editDeleteShareActive, setEditDeleteShareActive] = useState(true);
  //Open Error/Sucess Dialog
  const [openAlert, setOpenAlert] = React.useState(false);

  //Dialog on delete and save/update messages
  const [doubleCheckMessage, setDoubleCheckMessage] = useState("");

  //Dialog on delete and save/update operation
  const [operation, setOperation] = useState("");

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

  const closeDialogsAndSave = () => {
    const list = [];
    list.push(
      { name: "Range", objectValue: ranges },
      { name: "Country", objectValue: countryS === "none" ? [] : countryS },
      { name: "Ratings", objectValue: prefixIds }
    );

    const newReport = new Report(
      selectedID ? selectedID : null,
      valueDialogTextField,
      companyUser.name,
      companyUser.companyName,
      companyUser.email,
      valueType,
      list
    );

    if (newReport.id !== null) {
      updateReports(UserService.getToken(), companyUser, newReport)
        .then((res) => {
          updateReload(!reload);
          validateUpdateDeleteResponseCode(
            res,
            "Report changed sucessfully!",
            "You do not have the permission to change this report!"
          );
        })
        .catch((err) => {
          validateUpdateDeleteResponseCode(
            err.response.data.status,
            "Report changed sucessfully!",
            "You do not have the permission to change this report!"
          );
        });
    } else {
      saveReports(UserService.getToken(), companyUser, newReport)
        .then((res) => {
          setOpen(false)
          updateReload(!reload);
          if (res.status === 200) {
            setOpenAlert(true)
            setSeverityDelete('success')
            setSeverityMessageDelete('Report saved sucessfully!')
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
    setValueRadioChecked(!valueRadioChecked);
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
      setOperation(operation);
      setDoubleCheckMessage(doubleCheckMessage);
      setOpenWarning(true);
      setSelectedID(id);
    };

  const closeDialogsAndDelete = () => {
    deleteReport(UserService.getToken(), companyUser, selectedID)
      .then((code) => {
        updateReload(!reload);
        validateUpdateDeleteResponseCode(
          code,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      })
      .catch((err) => {
        validateUpdateDeleteResponseCode(
          err.response.data.status,
          "Report delete sucessfully!",
          "You do not have the permission to deleted this report!"
        );
      });
    closeDialogs();
    timerFunction();
  };

  const validateUpdateDeleteResponseCode = (
    code,
    successMessage,
    errorMessage
  ) => {
    if (code.status === 204) {
      setOpenAlert(true);
      setSeverityDelete("success");
      setSeverityMessageDelete(successMessage);
    } else if (code === 401) {
      setOpenAlert(true);
      setSeverityDelete("error");
      setSeverityMessageDelete(errorMessage);
    } else if (code === 500) {
      setOpenAlert(true);
      setSeverityDelete("error");
      setSeverityMessageDelete("Wrong Request Type!");
    }
  };

  const decideAction = () => {
    if (operation === "Save Changes") {
      closeDialogsAndSave();
    } else if (operation === "Delete Report") {
      closeDialogsAndDelete();
    }
    setSelectedID(null);
  };

  const hideAlert = () => {
    setSeverityDelete("");
    setSeverityMessageDelete("");
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
        setSeverityDelete("");
        setSeverityMessageDelete("");
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
            severity={severityDelete}
          >
            <span>{severityMessageDelete}</span>
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
        <div className="Dialog-Expand-Div">
          <h2>{operation}</h2>

          <div>
            <h3>{doubleCheckMessage}</h3>
          </div>
          <div className="warning-header">
            <Button
              className="btn-no"
              variant="outlined"
              onClick={closeDialogs}
            >
              No
            </Button>
            <Button
              onClick={decideAction}
            //disabled={validateSave}
            >
              Yes
            </Button>
          </div>
        </div>
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
        <ShareReport closeDialogs={closeDialogs}></ShareReport>
      </Dialog>
    </div>
  );
};

export default Reports;
