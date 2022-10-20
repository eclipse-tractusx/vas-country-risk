import React, { useState, useEffect, useContext } from "react";
import "./styles.scss";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Input } from "cx-portal-shared-components";
import { getReportsByCompanyUser } from "../../services/reports-api";
import UserService from "../../services/UserService";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { ReportContext } from "../../../contexts/reports";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const Reports = () => {
  const [selectionModel, setSelectionModel] = useState([]);

  //Context to get current selected country
  const { countryS, updateCountry } = useContext(CountryContext);

  //Context to save report data
  const { report, updateReport } = useContext(ReportContext);

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const [reports, setReport] = useState(["teste"]);

  const [open, setOpen] = React.useState(false);

  const [valueRadio, setValueRadio] = React.useState("OnlyMe");

  const [selectedDataTable, setselectedDataTable] = useState([]);

  const [valueTextField, setValueTextField] = React.useState(
    "Select a Report Bellow"
  );

  //Const for triggering error on Dialog Text Field
  const [ErrorTrigger, setErrorTrigger] = React.useState(true);

  //Const for triggering error on Dialog Text Field
  const [ValueDialogTextField, setValueDialogTextField] = React.useState(null);

  //Get Reports By user
  useEffect(() => {
    getReportsByCompanyUser(UserService.getToken(), companyUser).then(
      (response) => {
        console.log(response);
      }
    );
  }, []);

  const closeDialogs = () => {
    setOpen(false);
  };

  const closeDialogsAndSave = () => {
    if (ValueDialogTextField != null) {
      setOpen(false);
    }
  };

  const openDialog = () => {
    setOpen(!open);
  };

  //Handler for Checkbox
  const handleChangeCheckbox = (event) => {
    setValueRadio(event.target.value);
  };

  //Handler for Input Report name in Dialog Component
  const handleInputReportChange = (event) => {
    if (event.target.value.length > 32 || event.target.value.length === 0) {
      setErrorTrigger(true);
      setValueDialogTextField(null);
    } else {
      setErrorTrigger(false);
      setValueDialogTextField(event.target.value);
    }
  };

  //Handler for textvalue in main report component
  const handleChangeInput = (event) => {
    setValueTextField(event.target.value);
  };

  //Test Values Only
  const columns = [
    {
      field: "reportSavedName",
      headerName: "Saved Reports",
      sortable: false,
      width: 200,
    },
  ];

  //Test Values Only
  const rows = [
    { id: 1, reportSavedName: "Teste" },
    { id: 2, reportSavedName: "Teste2.0" },
    { id: 3, reportSavedName: "Teste30" },
    { id: 4, reportSavedName: "Teste7.0" },
    { id: 5, reportSavedName: "Teste8.0" },
    { id: 6, reportSavedName: "Teste9.0" },
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
        rows={rows}
        columns={columns}
        pageSize={5}
        headerHeight={0}
        rowsPerPageOptions={[5]}
        checkboxSelection={true}
        //hideFooter
        selectionModel={selectionModel}
        autoHeight={true}
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIds.has(row.id));

          if (selectedRows.length > 1) {
            const selectionSet = new Set(selectionModel);
            const result = selectedRows.filter((s) => !selectionSet.has(s.id));
            setSelectionModel(
              selectedRows.length ? result.map((r) => r.id) : []
            );
            setValueTextField(
              selectedRows.length
                ? result.map((r) => r.reportSavedName)
                : "Select a Report Bellow"
            );
          } else {
            setSelectionModel(selectedRows.map((r) => r.id));
            setValueTextField(
              selectedRows.length
                ? selectedRows.map((r) => r.reportSavedName)
                : "Select a Report Bellow"
            );
          }
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
              value={valueRadio}
              onChange={handleChangeCheckbox}
            >
              <FormControlLabel
                value="OnlyMe"
                control={<Radio />}
                label="Only For me"
              />
              <FormControlLabel
                value="Company"
                control={<Radio />}
                label="For the company"
              />
            </RadioGroup>
          </div>

          <FormLabel className="SecondLabel" component="legend">
            Please input the name of the Report
          </FormLabel>

          <Input
            className="input-report"
            error={ErrorTrigger}
            //helperText={"ERROR"}
            placeholder="Max 32 Characters"
            size={"small"}
            onChange={handleInputReportChange}
          ></Input>

          <Button style={{ margin: "1%" }} onClick={closeDialogs}>
            Close
          </Button>
          <Button style={{ margin: "1%" }} onClick={closeDialogsAndSave}>
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Reports;
