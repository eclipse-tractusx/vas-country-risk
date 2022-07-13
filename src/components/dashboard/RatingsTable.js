import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import { Table, Button, Dropzone } from "cx-portal-shared-components";
import ratingcol from "./ratingColumns.json";

const RatingsTable = () => {

    //TEST
    const rows = [
        { id: 1, rating: 'CPI Rating', weigth:'0' },
        { id: 2, rating: 'Basel', weigth:'0' },
        { id: 3, rating: 'Test', weigth:'0' },
        { id: 4, rating: 'Test2', weigth:'0' },
    ];

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
        <Table
            className="Ratingtable"
            title=""
            columns={ratingcol}
            rows={rows}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(ids) => {

                let i;
                const selectedIds = ids;

                for (i = 0; i < rows.length; i++) {
                    rows[i].weigth = 0;
                }

                const weightcalc = 100 / selectedIds.length;

                for (i = 0; i < selectedIds.length; i++) {

                    rows[selectedIds[i] - 1].weigth = weightcalc;

                }

               // setSelectedRows(selectedRows);
            }}
            toolbar={{
                title: "Ratings",
            }}
            rowsCount={rows.length}
            hideFooter>
        </Table>
    );

};

export default RatingsTable;