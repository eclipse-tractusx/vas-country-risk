let edit = false;

function setEdit(params) {
  console.log("columns");
  console.log(params);
  params.length > 1 ? (edit = true) : (edit = false);
}

export const columns = [
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
