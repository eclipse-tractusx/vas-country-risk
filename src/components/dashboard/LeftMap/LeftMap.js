/* eslint-disable no-console */
import React, { useState } from "react";
import { Dialog, IconButton } from "cx-portal-shared-components";
import "./styles.scss";
import CustomWorldMap from "../CustomWorld/CustomWorldMap";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Box } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { toPng } from "html-to-image";
import ProgressBar from "../ProgressBar/ProgressBar";
import CloseIcon from "@mui/icons-material/Close";

const LeftMap = (ratings) => {
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
    <div className="left-map">
      <Dialog open={expandMap} onClose={openDialog}>
        <Box id="idCustomWorldMap">
          <div className="buttons">
            <h2>World Map</h2>
            <IconButton onClick={printMap} size="medium">
              <FolderIcon></FolderIcon>
              <h2>Export image</h2>
            </IconButton>
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
          <CustomWorldMap
            getRatings={ratings.getRatings}
            years={ratings.years}
            mapWidth={1000}
            mapHeight={1000}
          ></CustomWorldMap>
          <div style={{ width: "250px" }}>
            <ProgressBar className="bar" valuePercentage={100} />
          </div>
        </Box>

        <></>
      </Dialog>
      <IconButton
        className="expand-button"
        color="primary"
        onClick={openDialog}
        size="medium"
        variant="outlined"
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      <CustomWorldMap
        getRatings={ratings.getRatings}
        years={ratings.years}
        mapWidth={1000}
        mapHeight={1000}
      ></CustomWorldMap>
    </div>
  );
};

export default LeftMap;
