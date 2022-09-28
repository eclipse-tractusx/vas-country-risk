/* eslint-disable no-console */
import React, { useState } from "react";
import { Dialog, IconButton, Button } from "cx-portal-shared-components";
import "./styles.scss";
import CustomWorldMap from "../CustomWorld/CustomWorldMap";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Box } from "@mui/material";
import { toPng } from "html-to-image";
import ProgressBar from "../ProgressBar/ProgressBar";
import CloseIcon from "@mui/icons-material/Close";
import CountryPicker from "./CountryPicker/CountryPicker"
import CustomCompanyMap from "../CustomCompanyMap/CustomCompanyMap";

const RightMap = (ratings) => {
  const [expandMap, setExpandMap] = useState(false);

  const openDialog = () => {
    setExpandMap(!expandMap);
  };

  const printMap = () => {
    const link = document.getElementById("idCustomWorldMap");
    toPng(link)
      .then((res) => {
        const img = new Image();
        img.src = res;
        var link = document.createElement("a");
        link.download = "worldMap.png";
        link.href = res;
        link.click();
      })
      .catch((error) => error);
  };

  return (
    <>
      <div>
        <Dialog
          open={expandMap}
          onClose={openDialog}
          className="left-dialog-expand-map"
        >
          <div className="expand-box-div">
            <Box className="expand-mui-box">
              <div className="buttons">
                <h2>Company View</h2>
                <CountryPicker></CountryPicker>
                <Button size="small" onClick={printMap}>
                  Export Image
                </Button>

                <IconButton
                  className="close-button"
                  color="primary"
                  onClick={openDialog}
                  size="medium"
                  variant="outlined"
                >
                  <CloseIcon></CloseIcon>
                </IconButton>
              </div>
              <div className="map-and-progressbar" id="idCustomWorldMap">
                <div className="expand-custom-world-map">
                  <CustomCompanyMap
                    getRatings={ratings.getRatings}
                    minMapWidth={0}
                    maxMapWidth={800}
                    minMapHeight={0}
                    maxMapHeight={600}
                  ></CustomCompanyMap>
                </div>
                <div className="progress-bar" style={{ width: "250px" }}>
                  <ProgressBar className="bar" valuePercentage={100} />
                </div>
              </div>
            </Box>
          </div>
        </Dialog>
      </div>
      <div className="left-map-container">
        <Box className="box-country-picker"></Box>
        <h2>Company View</h2>
        <CountryPicker></CountryPicker>
        <IconButton
          className="expand-button"
          color="primary"
          onClick={openDialog}
          size="medium"
          variant="outlined"
        >
          <OpenWithIcon></OpenWithIcon>
        </IconButton>
      </div>
      <CustomCompanyMap
        getRatings={ratings.getRatings}
        minMapWidth={0}
        maxMapWidth={800}
        minMapHeight={0}
        maxMapHeight={600}
      ></CustomCompanyMap>
    </>
  );
};

export default RightMap;
