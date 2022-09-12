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
];
