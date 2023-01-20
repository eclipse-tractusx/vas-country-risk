/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { getAll } from "../../services/dashboard-api";

import { Dialog, Table } from "cx-portal-shared-components";
import "./styles.scss";
import { columns } from "./tableColumns";
import { RangesContext } from "../../../contexts/ranges";
import { RatesContext } from "../../../contexts/rates";
import { CountryContext } from "../../../contexts/country";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { GatesContext } from "../../../contexts/gates";
import { capitalize } from "@mui/material";
import { DetailGrid } from "../DetailGrid/DetailGrid";
import DetailDialog from "../DetailDialog/DetailDialog";

const DashboardTable = (ratings, years) => {
  //Data Fetch
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  const { ranges } = useContext(RangesContext);
  const { countryS } = useContext(CountryContext);
  const { companyUser } = useContext(CompanyUserContext);
  const { gates } = useContext(GatesContext);
  const [openDetailGrid, setOpenDetailGrid] = useState(false);
  const [selectedDetailRow, setSelectedDetailRow] = useState([]);
  const openDetailGridFunction = (row) => {
    setOpenDetailGrid(true);
    setSelectedDetailRow([row]);
    console.log(row);
  };

  const onCloseDetailGridFunction = () => {
    setOpenDetailGrid(false);
  };

  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    getAll(
      ratings.getRatings,
      ratings.years,
      UserService.getToken(),
      companyUser,
      gates
    ).then((response) =>
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
    if (countryS !== "none") {
      const array = [];
      globalData.forEach((gd) => {
        if (gd.country === countryS.country) {
          array.push(gd);
        }
      });
      setData(array);
    } else if (countryS === "none") {
      setData(globalData);
    }
  }, [countryS.country, globalData]);

  useEffect(() => {
    if (ratings.weight !== 0) {
      getAll(
        ratings.getRatings,
        ratings.years,
        UserService.getToken(),
        companyUser,
        gates
      ).then((response) => {
        setGlobalData(response);
      });
    }
  }, [ratings.getRatings, ratings.years, ratings.weight, gates]);

  return (
    <>
      <div className="dashboard-table-style">
        <Table
          className="table"
          columns={columns(ranges, openDetailGridFunction)}
          rowsCount={data.length}
          rows={data}
          pageSize={15}
          rowHeight={50}
          headerHeight={40}
          autoHeight={true}
          checkboxSelection
          disableColumnMenu={true} //Remove Filtering
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
      </div>
      <Dialog open={openDetailGrid} onClose={onCloseDetailGridFunction}>
        <DetailDialog
          selectedDetailRow={selectedDetailRow}
          onCloseDetailGridFunction={onCloseDetailGridFunction}
        ></DetailDialog>
      </Dialog>
    </>
  );
};

export default DashboardTable;
