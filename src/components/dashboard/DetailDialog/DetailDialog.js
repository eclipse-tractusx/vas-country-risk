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
import React, { useState, useEffect, useContext, useCallback } from "react";

import { DialogHeader, DialogContent } from "cx-portal-shared-components";
import "./styles.scss";

import { capitalize } from "@mui/material";
import { DetailGrid } from "../DetailGrid/DetailGrid";
import { Divider } from "@mui/material";

const DetailDialog = ({ selectedDetailRow, onCloseDetailGridFunction }) => {
  const margin = { mr: -2, ml: -2, mt: -1, mb: 2 };

  const showFields = Object.keys(selectedDetailRow[0]).map((key) => {
    return (
      <>
        <Divider sx={margin} />
        <DetailGrid
          topic={capitalize(key)}
          content={selectedDetailRow[0][key]}
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
