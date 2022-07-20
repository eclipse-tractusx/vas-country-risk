import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Table, Button } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";
import Dialog from "@mui/material/Dialog";

const RatingsTable = ({ passValuesFromComponent }) => {
  //TEST
  let allrows = [
    { id: 1, rating: "CPI Rating", weight: 0 },
    { id: 2, rating: "PERC Asia Risk Guide", weight: 0 },
    { id: 3, rating: "Test", weight: 0 },
    { id: 4, rating: "Test2", weight: 0 },
  ];

  const setSelectedRows = [];

  //Upload Button Handlers
  const [open, setOpen] = React.useState(false);

  const [rates, setRatings] = useState([]);

  const ExpandTable = () => {
    setOpen(true);
  };

  const CloseTable = () => {
    setOpen(false);
  };

  //const [selectedRows, setSelectedRows] = useState([]);

  const [data, setData] = useState([]);
  /*const [selectedRows, setSelectedRows] = useState([]);
    const fetchData = (expr) => {
      const lexpr = expr.toLowerCase();
      getAll().then((response) =>
        setData(
          response.filter((row) => {
            return Object.keys(row).reduce((acc, value) => {
              return acc ? acc : String(row[value]).toLowerCase().includes(lexpr);
            }, false);
          })
        )
      );
    };*/

  return (
    <div>
      <Table
        className="Ratingtable"
        title=""
        setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
        columns={ratingcol}
        rows={allrows}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIds = new Set(ids);
          let i;

          const selectedRows = allrows.filter((row) => selectedIds.has(row.id));

          const weightcalculation = 100 / selectedRows.length;

          const weightcalc = weightcalculation.toFixed(2);

          for (i = 0; i < allrows.length; i++) {
            allrows[i].weight = 0;
          }

          for (i = 0; i < selectedRows.length; i++) {
            allrows[selectedRows[i].id - 1].weight = weightcalc;
            console.log(
              selectedRows[i].id -
                1 +
                "    " +
                allrows[selectedRows[i].id - 1].weight +
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
        rowsCount={allrows.length}
        hideFooter
      ></Table>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <Table
          className="Ratingtable"
          title=""
          columns={ratingcol}
          rows={allrows}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(ids) => {
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
          rowsCount={allrows.length}
          hideFooter
        ></Table>
      </Dialog>
    </div>
  );
};

export default RatingsTable;
