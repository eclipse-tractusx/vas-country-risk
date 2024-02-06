/********************************************************************************
 * Copyright (c) 2022,2024 BMW Group AG
 * Copyright (c) 2022,2024 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/
/* eslint-disable no-console */
import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Button,
  DialogHeader,
} from "cx-portal-shared-components";
import "./styles.scss";
import CustomWorldMap from "../CustomWorld/CustomWorldMap";
import OpenWithIcon from "@mui/icons-material/ZoomIn";
import { Box } from "@mui/material";
import { toPng } from "html-to-image";
import ProgressBar from "../ProgressBar/ProgressBar";
import CloseIcon from "@mui/icons-material/Close";
import { jsPDF } from "jspdf";

const LeftMap = (ratings) => {
  const [expandMap, setExpandMap] = useState(false);

  const openDialog = () => {
    setExpandMap(!expandMap);
  };

  const printMap = () => {
    const link = document.getElementById("printElement");
    toPng(link)
      .then((res) => {
        const img = new Image();
        img.src = res;
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
  
          // Set canvas dimensions to match the image size
          canvas.width = img.width;
          canvas.height = img.height;
  
          // Draw white background
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
  
          // Draw the image on the canvas
          context.drawImage(img, 0, 0);
  
          const finalDataUrl = canvas.toDataURL("image/png");

          const componentWidth = img.width
          const componentHeight = img.height
      
          const orientation = componentWidth >= componentHeight ? 'l' : 'p'

          const pdf = new jsPDF({orientation, unit: 'px'});

          pdf.internal.pageSize.width = componentWidth
          pdf.internal.pageSize.height = componentHeight

          pdf.addImage(finalDataUrl, 'PNG', 0, 0, componentWidth, componentHeight);
          pdf.save("worldmap.pdf");  
        };
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
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
            <div className="CloseIcon">
              <IconButton
                className="close-button"
                onClick={openDialog}
                size="medium"
                variant="primary"
              >
                <CloseIcon></CloseIcon>
              </IconButton>
            </div>
            <Box className="expand-mui-box">
            <DialogHeader title="World Map" />
              <div className="buttons">
                <Button size="small" onClick={printMap}>
                  Export Image
                </Button>
              </div>
              <div className="map-and-progressbar" id="idCustomWorldMap">
                <div className="expand-custom-world-map">
                  <CustomWorldMap
                    getRatings={ratings.getRatings}
                    years={ratings.years}
                    weight={ratings.weight}
                    minMapWidth={0}
                    maxMapWidth={800}
                    minMapHeight={0}
                    maxMapHeight={600}
                  ></CustomWorldMap>
                </div>
                <div className="progress-bar">
                  <ProgressBar className="bar" valuePercentage={100} />
                </div>
              </div>
            </Box>
          </div>
        </Dialog>
      </div>
      <div className="left-map-container">
        <h3 className="headerName">World Map</h3>
        <IconButton
          data-testid="expand-btn"
          className="expand-button"
          onClick={openDialog}
          size="medium"
          variant="text"
        >
          <OpenWithIcon></OpenWithIcon>
        </IconButton>
      </div>
      <CustomWorldMap
        getRatings={ratings.getRatings}
        years={ratings.years}
        weight={ratings.weight}
        minMapWidth={0}
        maxMapWidth={800}
        minMapHeight={0}
        maxMapHeight={600}
      ></CustomWorldMap>
    </>
  );
};

export default LeftMap;
