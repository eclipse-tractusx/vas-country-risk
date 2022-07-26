import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Table, Button } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";
import { getRatingsByYear } from "../services/ratingstable-api";

const RatingTable = ({
  passValuesFromComponent,
  years,
  openDialog,
  expandLabel,
}) => {
  //Upload Button Handlers

  const [label, setLabel] = React.useState("Expand Table");

  const [rates, setRatings] = useState([]);

  const dateChange = years;

  const ExpandTable = () => {
    if (true) {
      openDialog(false);
      setLabel("Expand Table");
    }
  };

  //Store Upcoming Ratings
  const [tableRatings, setTableRatings] = useState([]);

  const fetchData = () => {
    getRatingsByYear().then((response) => setTableRatings(response));
  };

  useEffect(() => {
    getRatingsByYear(years).then((response) => setTableRatings(response));
  }, [dateChange.length, years]);

  useEffect(() => {
    fetchData("");
  }, []);

  useEffect(() => {
    let totalWeight = rates.length > 0 ? 100 / rates.length : 0;
    tableRatings.map((each) =>
      rates.includes(each) ? (each.weight = totalWeight) : (each.weight = 0)
    );
  }, [rates, rates.length, tableRatings]);

  return (
    <Table
      className="table"
      title=""
      setRatingsToParent={passValuesFromComponent(rates)} // call function from parent component with new rates
      columns={ratingcol}
      rows={tableRatings}
      rowsCount={tableRatings.length}
      pageSize={5}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        const selectedIds = new Set(ids);
        const selectedRows = tableRatings.filter((row) =>
          selectedIds.has(row.id)
        );
        //pass ratings selected to top component
        setRatings(selectedRows);
      }}
      toolbar={{
        buttonLabel: expandLabel,
        onButtonClick: ExpandTable,
        title: "Ratings",
      }}
      hideFooter
    ></Table>
  );
};

export default RatingTable;
