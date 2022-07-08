import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Table, Button, Dropzone } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";

const RatingsTable = () => {

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
        <Table
            className="Ratingtable"
            title=""
            columns={ratingcol}
            rows={data}
            toolbar={{
                title: "Ratings",
            }}
            hideFooter>
        </Table>
    );

};

export default RatingsTable;