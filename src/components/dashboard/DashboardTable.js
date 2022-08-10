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
    getAll(ratings.getRatings, ratings.years).then((response) =>
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
    getAll(ratings.getRatings, ratings.years).then((response) => {
      setData(response);
    });
  }, [ratings.getRatings.length]);

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <Table
      disableColumnFilter
      className="table"
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
        title: "Number of Filtered Business Partners:",
      }}
    ></Table>
  );
};

export default DashboardTable;
