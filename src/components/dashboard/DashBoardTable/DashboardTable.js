/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { getAll } from "../../services/dashboard-api";
import { Table, Button, Typography } from "cx-portal-shared-components";
import "./styles.scss";
import { columns } from "./tableColumns";
import { RangesContext } from "../../../contexts/ranges";
import { RatesContext } from "../../../contexts/rates";
import UserService from "../../services/UserService";
const DashboardTable = (ratings, years) => {
  //Data Fetch
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { ranges, updateRanges } = useContext(RangesContext);
  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    getAll(ratings.getRatings, ratings.years, UserService.getToken()).then(
      (response) =>
        setData(
          response.filter((row) => {
            return Object.keys(row).reduce((acc, value) => {
              return acc
                ? acc
                : String(row[value]).toLowerCase().includes(lexpr);
            }, false);
          })
        )
    );
  };

  //Export to CSV
  const exportCsv = () => {
    const newArray = [];
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";

    newArray.push(Object.keys(selectedRows[0]));
    const values = selectedRows.map((row) => Object.values(row));
    [...newArray, ...values].forEach(function (rowArray) {
      let row = rowArray.join(";");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table-content.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getAll(ratings.getRatings, ratings.years, UserService.getToken()).then(
      (response) => {
        setData(response);
      }
    );
  }, [ratings.getRatings, ratings.years]);

  return (
    <>
      <Table
        className="table"
        columns={columns(ranges)}
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
    </>
  );
};

export default DashboardTable;
