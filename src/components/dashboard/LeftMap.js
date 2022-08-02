/* eslint-disable no-console */
import React, { useState } from "react";
import { Dialog, IconButton } from "cx-portal-shared-components";
import "./styles.scss";
import CustomWorldMap from "./CustomWorldMap";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Box, Container } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { toPng } from "html-to-image";


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
    <div className="maps">
      <Dialog open={expandMap}>
        <Box id="idCustomWorldMap" style={{ background: "white" }}>
          World Map
          <IconButton
            className="close-button"
            color="primary"
            onClick={openDialog}
            onFocusVisible={function noRefCheck() {}}
            size="medium"
            variant="outlined"
          >
            <OpenWithIcon></OpenWithIcon>
          </IconButton>
          <IconButton
            className="close-button"
            onClick={printMap}
            onFocusVisible={function noRefCheck() {}}
            size="medium"
          >
            <FolderIcon></FolderIcon>
            Export image
          </IconButton>
          <Container>
            <CustomWorldMap
              getRatings={ratings.getRatings}
              years={ratings.years}
            ></CustomWorldMap>
          </Container>
        </Box>
        <></>
      </Dialog>
      <IconButton
        className="expand-button"
        color="primary"
        onClick={openDialog}
        onFocusVisible={function noRefCheck() {}}
        size="medium"
        variant="outlined"
      >
        <OpenWithIcon></OpenWithIcon>
      </IconButton>
      <CustomWorldMap
        getRatings={ratings.getRatings}
        years={ratings.years}
      ></CustomWorldMap>
      <img alt="mapping" className="right-map" src="right_map.PNG"></img>
    </div>
  );
};

export default LeftMap;
