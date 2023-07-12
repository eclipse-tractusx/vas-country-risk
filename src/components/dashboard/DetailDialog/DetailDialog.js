/********************************************************************************
 * Copyright (c) 2022,2023 BMW Group AG
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
import React from "react";
import { DialogHeader, DialogContent } from "cx-portal-shared-components";
import "./styles.scss";
import UserService from "../../services/UserService";
import { capitalize } from "@mui/material";
import { DetailGrid } from "../DetailGrid/DetailGrid";
import { Divider } from "@mui/material";

const DetailDialog = ({ selectedDetailRow, onCloseDetailGridFunction }) => {
  const margin = { mr: -2, ml: -2, mt: -1, mb: 2 };
  const selectedRowsString = selectedDetailRow.map((row) => {
    let newRow = { ...row }; // Create a copy of the row
    if ("supplier" in newRow) {
      newRow.supplier = newRow.supplier ? "Yes" : "No";
    }
    if ("customer" in newRow) {
      newRow.customer = newRow.customer ? "Yes" : "No";
    }
    return newRow;
  });

  const roles = UserService.getRoles(); // Get the roles
  const hasReadCustomersRole = roles ? roles.includes("read_customers") : false;
  const hasReadSuppliersRole = roles ? roles.includes("read_suppliers") : false;

  const showFields = Object.keys(selectedRowsString[0])
    .filter((key) => {
      // Only include the key if the corresponding role is present
      if (key === "supplier") return hasReadSuppliersRole;
      if (key === "customer") return hasReadCustomersRole;
      return true; // Include all other keys
    })
    .map((key) => {
      return (
        <>
          <Divider sx={margin} />
          <DetailGrid
            topic={capitalize(key)}
            content={selectedRowsString[0][key]}
          ></DetailGrid>
        </>
      );
    });

  return (
    <>
      <DialogHeader
        title={`${selectedDetailRow[0].legalName} - Details`}
        closeWithIcon
        onCloseWithIcon={onCloseDetailGridFunction}
      ></DialogHeader>
      <DialogContent className="test">{showFields}</DialogContent>
    </>
  );
};

export default DetailDialog;
