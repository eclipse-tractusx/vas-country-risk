/* eslint-disable no-console */
import React, { useState, useEffect, Component } from "react";
import { getAll } from "../services/dashboard-api";
import { Table, Button, Dropzone } from "cx-portal-shared-components";
import myData from "./tableColumns.json";
import "./styles.scss";
import DashboardTable from "./DashboardTable";
import DatePicker from "./DatePicker";
import RangeSlider from "./RangeSlider";
import RatingsTable from "./RatingsTable";
import UploadButton from "./UploadButton";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Dashboard = () => {

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
        <DashboardTable></DashboardTable>
      </div>
      <div className="right-content">
        <div className="right-upper-content">
          <div className="right-upper-left-content">
            <DatePicker className="DateForm"></DatePicker>
          </div>
          <div className="divider"></div>
          <div className="right-upper-right-content">
            <Button title="RefreshButton">Refresh</Button>
          </div>
        </div>
        <div className="right-middle-content">
          <RatingsTable className="ratingtable"></RatingsTable>
        </div>
        <div className="right-middle-bottom-content">
          <UploadButton></UploadButton>
        </div>
        <div className="right-bottom-content">
          <div className="slider-header">
            <Button className="SaveRange" size="small">
              Save Ranges
            </Button>
          </div>
          <RangeSlider></RangeSlider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
