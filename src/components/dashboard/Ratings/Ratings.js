import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import { Table } from "cx-portal-shared-components";
import { RatesContext } from "../../../contexts/rates";
import { getRatingsByYear } from "../../services/ratingstable-api";
import { columns } from "./ratingColumns";

const Ratings = ({ passValuesFromComponent, years }) => {
  //Upload Button Handlers
  const [open, setOpen] = useState(false);

  const [tableRatings, setTableRatings] = useState([]);

  const [rates, setRatings] = useState([]);

  const [cellsModel, setCellsModel] = useState([]);

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const openDialog = () => {
    setOpen(!open);
  };

  const ExpandTable = () => {
    openDialog(false);
    //setTableRatings(rates);
    prefixIds.open = !prefixIds.open;
  };

  const fetchData = () => {
    getRatingsByYear().then((response) => setTableRatings(response));
  };

  useEffect(() => {
    getRatingsByYear(years).then((response) => setTableRatings(response));
  }, [years]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let totalWeight = rates.length > 0 ? 100 / rates.length : 0;
    totalWeight = Number(totalWeight.toFixed(2));
    console.log("calcular weights");
    console.log(tableRatings);
    console.log(cellsModel);
    if (Array.isArray(tableRatings)) {
      tableRatings.forEach((each) => {
        //console.log(each);
        rates.includes(each) ? (each.weight = totalWeight) : (each.weight = 0);
      });
    }
  }, [cellsModel, rates, rates.length, tableRatings]);

  const onEditCellPropsChange = (params) => {
    console.log("onEditCellPropsChange");
    console.log(params);
    console.log("tableRatings");
    console.log(rates);
    const arrayCells = cellsModel;
    arrayCells.push(params);
    setCellsModel(arrayCells);

    rates.forEach((each) => {
      if (each.id === params.id) {
        params.props.value = each.weight;
      }
    });
  };

  const handleEdit = (params) => {
    return rates.find((each) => each.id === params.id);
  };

  const [editRowData, setEditRowData] = React.useState({});
  const [editRowsModel, setEditRowsModel] = React.useState({});

  const handleEditRowsModelChange = React.useCallback(
    (model) => {
      const editedIds = Object.keys(model);
      console.log(model);
      // user stops editing when the edit model is empty
      if (editedIds.length === 0) {
        alert(JSON.stringify(editRowData, null, 4));
        // update on firebase
      } else {
        setEditRowData(model[editedIds[0]]);
      }

      setEditRowsModel(model);
    },
    [editRowData]
  );

  return (
    <div className="rating-table">
      <Table
        className="rating-table-content"
        setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
        columns={columns(tableRatings)}
        rows={tableRatings}
        rowsCount={tableRatings.length}
        pageSize={5}
        rowHeight={50}
        headerHeight={40}
        autoHeight={true}
        checkboxSelection
        disableSelectionOnClick
        editRowsModel={editRowsModel}
        selectionModel={prefixIds.map((r) => r.id)}
        experimentalFeatures={{ newEditingApi: true }}
        cellModesModel={columns}
        isCellEditable={handleEdit} // this works
        onEditRowsModelChange={handleEditRowsModelChange}
        //onEditCellPropsChange={onEditCellPropsChange} // this works
        //onCellEditCommit={handleRowEditCommit} // this works
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          const selectedRows = tableRatings.filter((row) =>
            selectedIds.has(row.id)
          );
          //pass ratings selected to top component
          selectedRows.open = prefixIds.open;
          setRatings(selectedRows);
          updatePrefixIds(selectedRows);
          console.log(tableRatings);
        }}
        toolbar={{
          buttonLabel: open ? "Close Ratings" : "Show Ratings",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        hideFooter={!prefixIds.open}
      ></Table>
      {/* <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <Table
          style={{ border: "1px solid #000", borderRadius: "0" }}
          setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
          columns={columns}
          rows={tableRatings}
          rowsCount={tableRatings.length}
          pageSize={5}
          rowHeight={50}
          headerHeight={40}
          autoHeight={true}
          checkboxSelection
          selectionModel={prefixIds.map((r) => r.id)}
          onSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRows = tableRatings.filter((row) =>
              selectedIds.has(row.id)
            );
            //pass ratings selected to top component
            selectedRows.open = prefixIds.open;
            setRatings(selectedRows);
            updatePrefixIds(selectedRows);
          }}
          toolbar={{
            buttonLabel: open ? "Close Ratings" : "Show Ratings",
            onButtonClick: ExpandTable,
            title: "Ratings",
          }}
          hideFooter={!prefixIds.open}
        ></Table>
      </Dialog> */}
    </div>
  );
};

export default Ratings;
