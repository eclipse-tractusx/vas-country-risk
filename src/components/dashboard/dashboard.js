/* eslint-disable no-console */
import React, { useState, useEffect, Component } from "react";
import { getAll } from "../services/dashboard-api";
import { Table, Button, Dropzone } from "cx-portal-shared-components";
import myData from "./tableColumns.json";
import "./styles.scss";

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import ratingcol from "./ratingColumns.json";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(valueGreen) {
  return `${valueGreen}`;
}

const Dashboard = () => {

  const [date, setDate] = React.useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const classes = useStyles();
  const minDistance = 5; //Yellow Slider Spacing

  //Slide Initialization
  const [valueGreen, setValue] = React.useState([60, 100]); //Green Slider (Fixed MAX-100 value)
  const [valueYellow, setValueYellow] = React.useState([20, 37]); //Yellow Slider
  const [valueRed, setValueRed] = React.useState([0, 37]); //Red Slider (Fixed MIN-0 value)

  //Green Slider Handler
  const handleChangeGreen = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  //Yellow Slider Handler 
  const handleChangeYellow = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValueYellow([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValueYellow([clamped - minDistance, clamped]);
      }
    } else {
      setValueYellow(newValue);
    }
  };

  //Red Slider Handler
  const handleChangeRed = (event, newValueThird) => {
    setValueRed(newValueThird);
  };

  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Data Fetch
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    getAll().then((response) =>
      setData(
        response.filter((row) => {
          return Object.keys(row).reduce((acc, value) => {
            return acc ? acc : String(row[value]).toLowerCase().includes(lexpr);
          }, false);
        })
      )
    );
  };

  //Export to CSV
  const exportCsv = () => {
    const newArray = [];
    let csvContent = "data:text/csv;charset=utf-8,";
    console.log("selectedRows");
    console.log(selectedRows);
    newArray.push(Object.keys(selectedRows[0]));
    const values = selectedRows.map((row) => Object.values(row));
    [...newArray, ...values].forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  };

  useEffect(() => {
    getAll().then((response) => {
      setData(response);
    });
  }, []);

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <div className="wrapper">
      <div className="main-content">
        <div className="maps">
          <img alt="mapping" className="left-map" src="left_map.PNG" />
          <img alt="mapping" className="right-map" src="right_map.PNG"></img>
        </div>

        <Table
          className="table"
          title="Number of Filtered Business Partners:"
          columns={myData}
          rows={data}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRows = data.filter((row) => selectedIds.has(row.id));
            setSelectedRows(selectedRows);
          }}
          toolbar={{
            buttonLabel: "Export to csv",
            onButtonClick: exportCsv,
            onSearch: fetchData,
          }}
        >
          <Button title="new button"></Button>
          <h1>teste2</h1>
        </Table>
      </div>
      <div className="right-content">
        <div className="right-upper-content">
          <div className="right-upper-left-content">
            <FormControl className="DateForm"  variant="filled" >
              <InputLabel id="demo-simple-select-filled-label">Select a Date</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={date}
                onChange={handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="divider"></div>
          <div className="right-upper-right-content">
            <Button title="RefreshButton">Refresh</Button>
          </div>
        </div>
        <div className="right-middle-content">
          <Table
            className="Ratingtable"
            title=""
            columns={ratingcol}
            rows={data}
            toolbar={{
              title: "Ratings",
            }}
            hideFooter
          >
            <Button title="new button"></Button>
            <h1>teste2</h1>
          </Table>
        </div>
        <div className="right-middle-bottom-content">
          <Button className="UploadButton" size="small" onClick={handleClickOpen}>Upload Rating</Button>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <DialogContent dividers>
              <Dropzone
                accept="image/*,audio/*,video/*"
                errorStatus={[
                  'error_upload_params',
                  'exception_upload',
                  'error_upload',
                  'aborted',
                  'ready'
                ]}
                getUploadParams={function noRefCheck() { }}
                onChangeStatus={function noRefCheck() { }}
                onClick={function noRefCheck() { }}
                statusText={{
                  aborted: 'Aborted',
                  done: 'Done',
                  error_file_size: 'Error file size',
                  error_upload: 'Error_upload',
                  error_upload_params: 'Error_upload_params',
                  error_validation: 'Error validation',
                  exception_upload: 'Exception_upload',
                  getting_upload_params: 'Getting upload_params',
                  headers_received: 'Headers_received',
                  preparing: 'Preparing',
                  ready: 'Ready',
                  rejected_file_type: 'Rejected file type',
                  rejected_max_files: 'Rejected max files',
                  removed: 'Removed',
                  restarted: 'Restarted',
                  started: 'Started',
                  uploading: 'Uploading'
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>Close</Button>
              <Button autoFocus onClick={handleClose}>Save</Button>
            </DialogActions>
          </Dialog>
          <div class="divider" />
          <Button className="DownloadButton" size="small">Download Template</Button>
        </div>
        <div className="right-bottom-content">
          <div className="slider-header">
            <Button className="SaveRange" size="small">Save Ranges</Button>
          </div>
          <div className="sliderone">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} >
                <Input
                  className={classes.input}
                  value={valueGreen[0]}
                  margin="dense"
                  //onChange={handleInputChange}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider className="sliderGreen"
                  value={valueGreen}
                  onChange={handleChangeGreen}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  className={classes.input}
                  value={100}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="slidertwo">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} >
                <Input
                  className={classes.input}
                  value={valueYellow[0]}
                  margin="dense"
                  //onChange={handleInputChange}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider
                  value={valueYellow}
                  onChange={handleChangeYellow}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  className={classes.input}
                  value={valueYellow[1]}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <div className="sliderthree">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} >
                <Input
                  className={classes.input}
                  value={0}
                  margin="dense"
                  //onChange={handleInputChange}
                  //onBlur={handleBlur}
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              <Grid item xs>
                <Slider className="sliderthree"
                  value={valueRed}
                  onChange={handleChangeRed}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={2}>
                <Input
                  className={classes.input}
                  value={valueRed[1]}
                  margin="dense"
                  inputProps={{
                    readOnly: true,
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
