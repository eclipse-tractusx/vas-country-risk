import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Table, Button } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";
import Dialog from "@mui/material/Dialog";
import { getRatingsByYear } from "../services/ratingstable-api";

const RatingsTable = ({ passValuesFromComponent }, date) => {

  //Test Data
  let allrows = [
    { id: 1, rating: "CPI Rating", weigth: "0" },
    { id: 2, rating: "PERC Asia Risk Guide", weigth: "0" },
    { id: 3, rating: "Test", weigth: "0" },
    { id: 4, rating: "Test2", weigth: "0" },
  ];

  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);

  const [rates, setRatings] = useState([]);

  const ExpandTable = () => {
    setOpen(true);
  };

  const CloseTable = () => {
    setOpen(false);
  };

  //Store Upcoming Ratings
  const [Tableratings, SetTableRatings] = useState([]);

  const fetchData = () => {
    getRatingsByYear().then((response) => SetTableRatings(response));
  };

  useEffect(() => {
    getRatingsByYear(date.getYear).then((response) => SetTableRatings(response));
  }, [date.getYear]);

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <div>
      <Table 
        className="Ratingtable"
        title=""
        setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
        columns={ratingcol}
        rows={Tableratings}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          let i;

          const selectedRows = Tableratings.filter((row) =>
            selectedIds.has(row.id)
          );

          const weightcalculation = 100 / selectedRows.length;

          const weightcalc = weightcalculation.toFixed(2);

          for (i = 0; i < Tableratings.length; i++) {
            Tableratings[i].weight = 0;
          }

          for (i = 0; i < selectedRows.length; i++) {
            Tableratings[selectedRows[i].id - 1].weight = weightcalc;
            console.log(
              selectedRows[i].id -
                1 +
                "    " +
                Tableratings[selectedRows[i].id - 1].weight +
                "         " +
                weightcalc
            );
          }

          //pass ratings selected to top component
          setRatings(selectedRows);
        }}
        toolbar={{
          buttonLabel: "Expand Table",
          onButtonClick: ExpandTable,
          title: "Ratings",
        }}
        rowsCount={Tableratings.length}
        hideFooter
      ></Table>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <Table
          className="Ratingtable"
          title=""
          setRatingsToParent={passValuesFromComponent(rates)}
          columns={ratingcol}
          rows={Tableratings}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIds = new Set(ids);
            const selectedRows = Tableratings.filter((row) =>
              selectedIds.has(row.id)
            );
            setRatings(selectedRows);
            //let i;
            //const selectedIds = ids;
            //for (i = 0; i < rows.length; i++) {
            // rows[i].weigth = 0;
            //}
            //const weightcalc = 100 / selectedIds.length;
            //for (i = 0; i < selectedIds.length; i++) {
            //   rows[selectedIds[i] - 1].weigth = weightcalc;
            //}
            // setSelectedRows(selectedRows);
          }}
          toolbar={{
            buttonLabel: "Close",
            onButtonClick: CloseTable,
            title: "Ratings",
          }}
          rowsCount={Tableratings.length}
          hideFooter
        ></Table>
      </Dialog>
    </div>
  );
};

export default RatingsTable;
