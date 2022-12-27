import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "./styles.scss";
import { MultiSelectList } from "cx-portal-shared-components";

import { Button } from "cx-portal-shared-components";

const ShareReport = () => {
  return (
    <div className="shareReportComponent">
      <Box>
        <MultiSelectList
          clearText="clear"
          filterOptionsArgs={{}}
          helperText="Helper"
          items={[
            {
              id: 1,
              title: "Dismantler App",
              value: "App1",
            },
            {
              id: 2,
              title: "Application name",
              value: "App2",
            },
            {
              id: 3,
              title: "Title Application",
              value: "App3",
            },
            {
              id: 4,
              title: "CX Design lunched",
              value: "App4",
            },
            {
              id: 5,
              title: "Fleet Manager",
              value: "App5",
            },
            {
              id: 6,
              title: "Fraud Daschboard",
              value: "App6",
            },
            {
              id: 7,
              title: "App Manage Customers",
              value: "App7",
            },
            {
              id: 8,
              title: "Smart Application",
              value: "App8",
            },
            {
              id: 9,
              title: "Material Traceability",
              value: "App9",
            },
          ]}
          keyTitle="title"
          label="Share Report"
          margin="dense"
          noOptionsText="No Options"
          notItemsText="not items selected"
          onAddItem={function noRefCheck() {}}
          placeholder="Enter Person email (type min 2 character)"
          tagSize="medium"
          variant="filled"
        />

        <div>
          <Button className="btn-close">Close</Button>
          <Button className="btn-save">Share</Button>
        </div>
      </Box>
    </div>
  );
};

export default ShareReport;
