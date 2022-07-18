/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { getAll } from "../services/dashboard-api";
import { Table } from "cx-portal-shared-components";
import "./styles.scss";
import { columns } from "./tableColumns";

const DashboardTable = (ratings) => {
  //Data Fetch
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    console.log("atings");
    console.log(ratings);
    getAll(ratings).then((response) =>
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
    getAll(ratings).then((response) => {
      setData(response);
    });
  }, []);

  useEffect(() => {
    fetchData("");
  }, []);

  console.log(ratings);

  return (
    <Table
      className="table"
      title="Number of Filtered Business Partners:"
      columns={columns}
      rowsCount={data.length}
      rows={data}
      pageSize={15}
      rowHeight={50}
      headerHeight={40}
      autoHeight={false}
      checkboxSelection
      getRowClassName={(params) => `${params.row.status}`}
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
    ></Table>
  );
};

export default DashboardTable;
