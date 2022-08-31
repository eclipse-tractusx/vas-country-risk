function validate(...params) {
  console.log("columns");
  console.log(params);
  validateRow();
}

function validateRow(row, tableRatings) {
  console.log("validateRow");
  console.log(row);
}

export const columns = (tableRatings) => [
  {
    field: "id",
    hide: true,
  },
  {
    description: "Rating",
    field: "dataSourceName",
    flex: 2,
    headerName: "Rating",
  },
  {
    description: "Weigthing (%)",
    field: "weight",
    flex: 2,
    headerName: "Weigthing (%)",
    editable: true,
  },
];
