import React, { useState, useContext, useEffect } from "react";
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

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const openDialog = () => {
    setOpen(!open);
  };

  const ExpandTable = () => {
    openDialog(false);
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

    if (Array.isArray(tableRatings)) {
      tableRatings.map((each) =>
        rates.includes(each) ? (each.weight = totalWeight) : (each.weight = 0)
      );
    }
  }, [rates, rates.length, tableRatings]);

  const handleRowEditCommit = React.useCallback((params) => {
    console.log("prefixIds");
    console.log(prefixIds);
    console.log("rates");
    console.log(rates);
    console.log("handleRowEditCommit");
    console.log(params);

    const id = params.id;
    const key = params.field;
    const value = params.value;
    // prefixIds.forEach((element) => {
    //   console.log("element");
    //   console.log(element);
    //   if (element.id === id) {
    //     element.weight = value;
    //   }
    // });
  }, []);

  const handleClick = (params) => {
    console.log("handleClick");
    console.log(prefixIds);
    console.log("rates");
    console.log(rates);
    rates.forEach((each) => {
      console.log(each.id === params.id);
    });

    params.colDef.editable = true;
    console.log(params);

    const id = params.id;
    const key = params.field;
    const value = params.value;
    // prefixIds.forEach((element) => {
    //   console.log("element");
    //   console.log(element);
    //   if (element.id === id) {
    //     element.weight = value;
    //   }
    // });
  };

  const [cellModesModel, setCellModesModel] = React.useState({});

  const handleCellClick = React.useCallback((params) => {
    console.log("handleCellClick");
    console.log(params);
    setCellModesModel((prevModel) => {
      return {
        // Revert the mode of the other cells from other rows
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: {},
              }),
              {}
            ),
          }),
          {}
        ),
        [params.id]: {
          // Revert the mode of other cells in the same row
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: {} }),
            {}
          ),
          [params.field]: {},
        },
      };
    });
  }, []);

  const handleCellModesModelChange = React.useCallback((newModel) => {
    console.log("handleCellModesModelChange");
    console.log(newModel);
    setCellModesModel(newModel);
  }, []);
  return (
    <div className="rating-table">
      <Table
        className="rating-table-content"
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
        // cellModesModel={cellModesModel}
        // onCellModesModelChange={handleCellModesModelChange}
        // onCellClick={handleCellClick}
        // // experimentalFeatures={{ newEditingApi: true }}
        // // onCellEditCommit={handleRowEditCommit}
        // // onCellModesModelChange={handleClick}
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
          buttonLabel: open ? "Close" : "Expand Label",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        hideFooter={!prefixIds.open}
      ></Table>
      <Dialog
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
            buttonLabel: open ? "Close" : "Expand Label",
            onButtonClick: ExpandTable,
            title: "Ratings",
          }}
          hideFooter={!prefixIds.open}
        ></Table>
      </Dialog>
    </div>
  );
};

export default Ratings;
