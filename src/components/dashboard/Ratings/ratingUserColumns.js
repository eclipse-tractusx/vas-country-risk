import { IconButton } from "cx-portal-shared-components";
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
