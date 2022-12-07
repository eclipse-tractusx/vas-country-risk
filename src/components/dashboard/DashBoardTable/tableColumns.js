import clsx from "clsx";

export const columns = (ranges) => [
  {
    description: "Business Partner Number",
    field: "bpn",
    flex: 1,
    minWidth: 100,
    headerName: "Business Partner Number",
  },
  {
    description: "Legal Name",
    field: "legalName",
    flex: 1,
    minWidth: 100,
    headerName: "Legal Name",
  },
  {
    description: "Address",
    field: "address",
    flex: 1,
    minWidth: 100,
    headerName: "Address",
  },
  /*{
    description: "Street",
    field: "street",
    flex: 1,
    minWidth: 100,
    headerName: "Street",
  },
  {
    description: "Zip-Code",
    field: "zipcode",
    flex: 1,
    minWidth: 100,
    headerName: "Zip-Code",
  },*/
  {
    description: "City",
    field: "city",
    flex: 1,
    minWidth: 100,
    headerName: "City",
  },
  {
    description: "Country",
    field: "country",
    flex: 1,
    minWidth: 100,
    headerName: "Country",
  },
  {
    description: "Score",
    field: "score",
    headerName: "Score",
    type: "number",

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
    flex: 1,
    minWidth: 100,
    headerName: "Rating",
    cellClassName: (params) =>
      clsx("super-app", {
        nullColor: params.value === "",
      }),
  },
];
