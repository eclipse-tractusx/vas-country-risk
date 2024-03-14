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
import { IconButton } from "@catena-x/portal-shared-components";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useCallback } from "react";

export const columnsUser = (rates, onClickDelete) => [
  {
    field: "id",
    hide: true,
  },
  {
    description: "Rating",
    field: "dataSourceName",
    flex: 3,
    headerName: "Rating",
  },
  {
    description: "Weigthing (%)",
    field: "weight",
    flex: 2,
    headerName: "Weigthing (%)",
    editable: true,
    valueGetter: (params) => {
      const x = rates.find((x) => x.id === params.id);

      if (x !== undefined && Object.hasOwn(x, "weight")) {
        return x.weight;
      } else {
        return 0;
      }
    },
  },
  {
    field: "actions",
    type: "actions",
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        data-testid={"deleteRatingIcon"}
        icon={<DeleteIcon />}
        label="Delete"
        onClick={onClickDelete(params.id)}
      />,
    ],
  },
];
