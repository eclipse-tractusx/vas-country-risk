/* eslint-disable no-console */
import React, { useState } from "react";
import { Dialog, IconButton } from "cx-portal-shared-components";
import "./styles.scss";
import CustomWorldMap from "./CustomWorldMap";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Box, Container } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { toPng } from "html-to-image";
import ProgressBar from "./ProgressBar";

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
    <>
      <Dialog open={expandMap}>
        <Container>
          <Box id="idCustomWorldMap" style={{ background: "white" }}>
            World Map
            <IconButton
              className="close-button"
              color="primary"
              onClick={openDialog}
              size="medium"
              variant="outlined"
            >
              <OpenWithIcon></OpenWithIcon>
            </IconButton>
            <IconButton
              className="close-button"
              onClick={printMap}
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
            <div style={{ width: "250px" }}>
              <ProgressBar valuePercentage={100} />
            </div>
          </Box>
        </Container>
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
      ></CustomWorldMap>
    </>
  );
};

export default LeftMap;
