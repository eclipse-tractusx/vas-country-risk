/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { getAll } from "../../services/dashboard-api";

import { Dialog } from "@catena-x/portal-shared-components";
import { Table } from "@catena-x/portal-shared-components";
import "./styles.scss";
import { columns } from "./tableColumns";
import { RangesContext } from "../../../contexts/ranges";
import { CountryContext } from "../../../contexts/country";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { GatesContext } from "../../../contexts/gates";
import DetailDialog from "../DetailDialog/DetailDialog";

const DashboardTable2 = (ratings, years) => {
  //Data Fetch
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [roles, setRoles] = useState(UserService.getRoles());
  const [selectedRows, setSelectedRows] = useState([]);
  const { ranges } = useContext(RangesContext);
  const { countryS } = useContext(CountryContext);
  const { companyUser } = useContext(CompanyUserContext);
  const { gates } = useContext(GatesContext);
  const [openDetailGrid, setOpenDetailGrid] = useState(false);
  const [selectedDetailRow, setSelectedDetailRow] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [expr, setExpr] = useState("");
  const openDetailGridFunction = (row) => {
    setOpenDetailGrid(true);
    setSelectedDetailRow([row]);
  };

  const onCloseDetailGridFunction = () => {
    setOpenDetailGrid(false);
  };

  const fetchData = (expr) => {
    const lexpr = expr.toLowerCase();
    setExpr(expr);
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

  useEffect(() => {
    setTableColumns(columns(ranges, openDetailGridFunction, roles));
  }, [roles, ranges]);

  return (
    <>
      <div className="dashboard-table-style">
        <Table
          className="table"
          columns={tableColumns}
          rowsCount={data.length}
          checkboxSelection
          columnHeadersBackgroundColor="rgb(233, 233, 233);"
          rows={data}
          pageSize={15}
          rowHeight={50}
          headerHeight={40}
          onRowSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRows = data.filter((row) => selectedIds.has(row.id));
            setSelectedRows(selectedRows);
          }}
          buttonLabel="Export to csv"
          onButtonClick={exportCsv}
          onSearch={fetchData}
          searchExpr={expr}
          title="Number of Filtered Business Partners:"
          toolbarVariant="basic"
        />
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

export default DashboardTable2;
