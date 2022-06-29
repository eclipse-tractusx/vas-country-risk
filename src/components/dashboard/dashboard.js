/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { getAll } from "../services/dashboard-api";
import { Table, Button } from "cx-portal-shared-components";
import myData from "./tableColumns.json";
import "./styles.scss";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    getAll().then((response) =>
      setData(
        response.filter((val) => {
          if (lexpr === "") {
            return val;
          } else if (
            String(val.city).toLowerCase().includes(lexpr) ||
            String(val.address).toLowerCase().includes(lexpr)
          )
            return val;
        })
      )
    );
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
          toolbar={{
            title: "teste1",
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
