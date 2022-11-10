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
} from "../../services/reports-api";
import UserService from "../../services/UserService";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { RangesContext } from "../../../contexts/ranges";
import { RatesContext } from "../../../contexts/rates";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { Report } from "../../model/Report";
import { Alert } from "cx-portal-shared-components";
import { ReloadContext } from "../../../contexts/refresh";

const Reports = () => {
  const [selectionModel, setSelectionModel] = useState([]);

  //Context to get current selected country
  const { countryS, updateCountry } = useContext(CountryContext);
  const { ranges, updateRanges } = useContext(RangesContext);
  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  //Context to save report data
  const { reportValuesContext, updateReport } = useContext(ReportContext);

  const [report, setReport] = useState([]);

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const [open, setOpen] = React.useState(false);

  const { reload, updateReload } = useContext(ReloadContext);

  const [valueType, setType] = useState("Global");

  const [valueTextField, setValueTextField] = React.useState(
    "Select a Report Bellow"
  );

  //Const for triggering error on Dialog Text Field
  const [errorTrigger, setErrorTrigger] = React.useState(true);

  //Const for triggering error on Dialog Text Field
  const [valueDialogTextField, setValueDialogTextField] = React.useState(null);

  //Get Reports By user
  useEffect(() => {
    getReportsByCompanyUser(UserService.getToken(), companyUser).then(
      (response) => {
        console.log("code", response);
        setReport(response || []);
      }
    );
  }, [reload]);

  const closeDialogs = () => {
    setOpen(false);
  };

  const [severity, setSeverity] = useState("");
  const [severityMessage, setSeverityMessage] = useState("");

  const closeDialogsAndSave = () => {
    const list = [];
    list.push(
      { name: "Range", objectValue: ranges },
      { name: "Country", objectValue: countryS === "none" ? [] : countryS },
      { name: "Ratings", objectValue: prefixIds }
    );
    const newReport = new Report(
      valueDialogTextField,
      companyUser.name,
      companyUser.company,
      valueType,
      list
    );

    saveReports(UserService.getToken(), companyUser, newReport)
      .then((res) => {
        setOpen(false);
        updateReload(!reload);
      })
      .catch((response) => {
        if (response.response.status === 400) {
          setSeverity("error");
          setSeverityMessage(response.response.data.message);
          setOpen(true);
          setValidateSave(false);
        }
      });
  };

  const [reportType, setReportType] = useState(false);

  const setMessage = () => {
    setReportType(true);
    setSeverity("warning");
    setSeverityMessage("Custom Rating Selected");
  };
  const openDialog = () => {
    setSeverity("");
    setSeverityMessage("");
    setOpen(!open);

    const customSelection = prefixIds.find(
      (element) => element.type === "Custom"
    );

    customSelection ? setMessage() : setReportType(false);
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
  };

  const handleChange = () => {
    setValueRadioChecked(false);
  };

  const columns = [
    {
      field: "radiobutton",
      headerName: <Radio onChange={clearButton} checked={valueRadioChecked} />,
      width: 120,
      renderCell: (params) => (
        <Radio
          onChange={handleChange}
          checked={selectionModel[0] === params.id}
          value={params.id}
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
  ];

  return (
    <div className="reportdiv">
      <div className="reports-header">
        <TextField
          InputProps={{ style: { fontSize: 12 } }}
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
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        selectionModel={selectionModel}
        autoHeight={!report || report.length ? true : false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          const selectionSet = new Set(newSelectionModel);
          const result = report.filter((s) => selectionSet.has(s.id));
          setValueTextField(result[0].reportName);
          updateReport(result[0]);
        }}
      />

      <Dialog open={open} onClose={closeDialogs} className="Dialog-Expand">
        <div className="Dialog-Expand-Div">
          <FormLabel className="FirstLabel" component="legend">
            Select availability
          </FormLabel>
          <div className="CheckBox-Div">
            <RadioGroup
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
          <Button style={{ margin: "1%" }} onClick={closeDialogs}>
            Close
          </Button>
          <Button
            style={{ margin: "1%" }}
            onClick={closeDialogsAndSave}
            disabled={validateSave}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Reports;
