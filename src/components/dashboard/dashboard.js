/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { getAll } from "../services/dashboard-api";
import { Table, Button } from "cx-portal-shared-components";
import myData from "./tableColumns.json";
import "./styles.scss";

const Dashboard = () => {
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
        <h1>hi table</h1>
      </div>
    </div>
  );
};

export default Dashboard;
