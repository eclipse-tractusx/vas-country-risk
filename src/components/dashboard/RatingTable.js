import React, { useState, useEffect, useContext, Component } from "react";
import "./styles.scss";
import { Table, Button } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";
import { getRatingsByYear } from "../services/ratingstable-api";
import { RatesContext } from "../../contexts/rates";

const RatingTable = ({
  passValuesFromComponent,
  years,
  openDialog,
  expandLabel,
}) => {
  //Upload Button Handlers

  const [rates, setRatings] = useState([]);

  const { prefixIds, updatePrefixIds } = useContext(RatesContext);

  const dateChange = years;

  const ExpandTable = () => {
    openDialog(false);
    prefixIds.open = !prefixIds.open;
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

    if (Array.isArray(tableRatings)) {
      tableRatings.map((each) =>
        rates.includes(each) ? (each.weight = totalWeight) : (each.weight = 0)
      );
    }
  }, [rates, rates.length, tableRatings]);

  return (
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
      //selectionModel={prefixIds.map((r) => r.id)}
      onSelectionModelChange={(ids) => {
        const selectedIds = new Set(ids);
        const selectedRows = tableRatings.filter((row) =>
          selectedIds.has(row.id)
        );
        //pass ratings selected to top component
        setRatings(selectedRows);
        // selectedRows.open = prefixIds.open;
        // updatePrefixIds(selectedRows);
      }}
      toolbar={{
        buttonLabel: expandLabel,
        onButtonClick: ExpandTable,
        title: "Ratings",
      }}
      hideFooter={!prefixIds.open}
    ></Table>
  );
};

export default RatingTable;
