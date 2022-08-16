import React, { useState } from "react";
import "./styles.scss";
import Dialog from "@mui/material/Dialog";
import RatingTable from "./RatingTable";

const Rating = ({ passValuesFromComponent, years }) => {
  //Upload Button Handlers
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <RatingTable
        passValuesFromComponent={passValuesFromComponent}
        years={years}
        openDialog={openDialog}
        expandLabel={open ? "Close" : "Expand Table"}
      ></RatingTable>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={openDialog}
      >
        <RatingTable
          passValuesFromComponent={passValuesFromComponent}
          years={years}
          openDialog={openDialog}
          expandLabel={open ? "Close" : "Expand Table"}
        ></RatingTable>
      </Dialog>
    </div>
  );
};

export default Rating;
