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
import clsx from "clsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "cx-portal-shared-components";
import { capitalize } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
export const columns = (ranges, onDetailClick, roles) => {
  const hiddenColumns = ["street", "houseNumber", "zipCode"];
  const hasReadCustomersRole =
    roles && Array.isArray(roles)
      ? roles.some((role) => role.toLowerCase() === "customer".toLowerCase())
      : false;
  const hasReadSuppliersRole =
    roles && Array.isArray(roles)
      ? roles.some((role) => role.toLowerCase() === "supplier".toLowerCase())
      : false;

  return [
    {
      description: "Business Partner Number",
      field: "bpn",
      flex: 1.5,
      headerName: "Business Partner Number",
    },
    {
      description: "Legal Name",
      field: "legalName",
      flex: 1.5,
      headerName: "Legal Name",
    },
    ...hiddenColumns.map((field) => ({
      description: field,
      field,
      flex: 1.5,
      headerName: capitalize(field),
      hide: true,
    })),
    {
      description: "Country",
      field: "country",
      flex: 1.5,
      headerName: "Country",
    },
    {
      description: "City",
      field: "city",
      flex: 1.5,
      headerName: "City",
    },
    {
      description: "Score",
      field: "score",
      headerName: "Score",
      flex: 1.5,
      cellClassName: (params) =>
        clsx("super-app", {
          minColor: params.value < ranges[1][0],
          between: params.value >= ranges[1][0] && params.value < ranges[2][0],
          maxColor: params.value >= ranges[2][0],
          nullColor: params.value === 0,
        }),
    },
    {
      description: "Rating",
      field: "rating",
      flex: 1.5,
      headerName: "Rating",
      cellClassName: (params) =>
        clsx("super-app", {
          nullColor: params.value === "",
        }),
    },
    {
      description: "Supplier",
      field: "supplier",
      flex: 1.5,
      headerName: "Supplier",
      hide: !hasReadSuppliersRole,
      renderCell: (params) =>
        params.value ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <CancelIcon style={{ color: "red" }} />
        ),
    },
    {
      description: "Customer",
      field: "customer",
      flex: 1.5,
      headerName: "Customer",
      hide: !hasReadCustomersRole,
      renderCell: (params) =>
        params.value ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <CancelIcon style={{ color: "red" }} />
        ),
    },
    {
      description: "Detail",
      field: "detail",
      flex: 1.5,
      headerName: "Detail",
      renderCell: ({ row }) => (
        <IconButton
          onClick={() => onDetailClick(row)}
          color="secondary"
          size="small"
          title="Detail"
          aria-label="detail-button"
        >
          <ArrowForwardIcon />
        </IconButton>
      ),
    },
  ];
};
