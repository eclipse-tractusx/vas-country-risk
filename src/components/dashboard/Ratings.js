import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import { Table } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";
import { RatesContext } from "../../contexts/rates";
import { getRatingsByYear } from "../services/ratingstable-api";
const Rating = ({ passValuesFromComponent, years }) => {
  const dateChange = years;

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
  }, [dateChange.length, years]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let totalWeight = rates.length > 0 ? 100 / rates.length : 0;

    if (Array.isArray(tableRatings)) {
      tableRatings.map((each) =>
        rates.includes(each) ? (each.weight = totalWeight) : (each.weight = 0)
      );
    }
  }, [rates, rates.length, tableRatings]);

  return (
    <div>
      <Table
        className="table"
        setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
        columns={ratingcol}
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
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <Table
          className="table"
          setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
          columns={ratingcol}
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

export default Rating;
