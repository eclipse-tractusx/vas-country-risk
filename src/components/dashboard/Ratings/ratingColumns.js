import { IconButton } from 'cx-portal-shared-components'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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
  {
    description: "Edit",
    field: "Edit",
    flex: 1,
    headerName: "Edit",
    renderCell: () => (
      <IconButton color="secondary">
      <EditIcon />
    </IconButton>
    ),
  },
  {
    description: "Delete",
    field: "delete",
    flex: 1,
    headerName: "Delete",
    renderCell: () => (
      <IconButton color="secondary">
      <DeleteIcon />
    </IconButton>
    ),
  },
];
