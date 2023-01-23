/* eslint-disable no-console */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { getAll } from "../../services/dashboard-api";

import { DialogHeader, DialogContent } from "cx-portal-shared-components";
import "./styles.scss";

import { capitalize } from "@mui/material";
import { DetailGrid } from "../DetailGrid/DetailGrid";
import { Divider } from "@mui/material";

const DetailDialog = ({ selectedDetailRow, onCloseDetailGridFunction }) => {
  const margin = { mr: -2, ml: -2 };

  const showFields = Object.keys(selectedDetailRow[0]).map((key) => {
    return (
      <>
        <Divider sx={margin} />
        <DetailGrid
          topic={capitalize(key)}
          content={selectedDetailRow[0][key]}
        ></DetailGrid>
      </>
    );
  });

  return (
    <>
      <DialogHeader
        title={`${selectedDetailRow[0].legalName} - Details`}
        closeWithIcon
        onCloseWithIcon={onCloseDetailGridFunction}
      ></DialogHeader>
      <DialogContent>{showFields}</DialogContent>
    </>
  );
};

export default DetailDialog;
