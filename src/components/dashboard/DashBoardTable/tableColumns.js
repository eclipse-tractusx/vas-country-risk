import clsx from "clsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "cx-portal-shared-components";
import { capitalize } from "@mui/material";
export const columns = (ranges, onDetailClick) => {
  const hiddenColumns = ["street", "houseNumber", "zipCode", "city"];
  return [
    {
      description: "Business Partner Number",
      field: "bpn",
      flex: 2,
      headerName: "Business Partner Number",
    },
    {
      description: "Legal Name",
      field: "legalName",
      flex: 2,
      headerName: "Legal Name",
    },
    ...hiddenColumns.map((field) => ({
      description: field,
      field,
      flex: 2,
      headerName: capitalize(field),
      hide: true,
    })),
    {
      description: "Country",
      field: "country",
      flex: 2,
      headerName: "Country",
    },
    {
      description: "Score",
      field: "score",
      headerName: "Score",
      flex: 2,
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
      flex: 2,
      headerName: "Rating",
      cellClassName: (params) =>
        clsx("super-app", {
          nullColor: params.value === "",
        }),
    },
    {
      description: "Detail",
      field: "detail",
      flex: 2,
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
