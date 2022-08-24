let edit = false;

function setEdit(params) {
  params.length > 1 ? (edit = true) : (edit = false);
}

export const columns = (rates) => [
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
    valueGetter: setEdit(rates),
    editable: edit,
  },
];
