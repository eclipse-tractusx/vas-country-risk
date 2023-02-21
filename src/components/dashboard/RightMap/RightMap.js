/********************************************************************************
 * Copyright (c) 2022,2023 BMW Group AG
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
import OpenWithIcon from "@mui/icons-material/ZoomIn";
import { Box } from "@mui/material";
import { toPng } from "html-to-image";
import CloseIcon from "@mui/icons-material/Close";
import CountryPicker from "../CountryPicker/CountryPicker";
import CustomCompanyMap from "../CustomCompanyMap/CustomCompanyMap";

const RightMap = (ratings) => {
  const [expandMap, setExpandMap] = useState(false);

  const openDialog = () => {
    setExpandMap(!expandMap);
  };

  const printMap = () => {
    const link = document.getElementById("idCustomCompanyView");
    toPng(link)
      .then((res) => {
        const img = new Image();
        img.src = res;
        var link = document.createElement("a");
        link.download = "BussinessPartnerMap.png";
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
          className="right-dialog-expand-map"
        >
          <div className="expand-box-div">
            <div className="closeIcon">
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
              <DialogHeader title="Company View" />
              <div className="buttons">
                <CountryPicker></CountryPicker>
                <Button size="small" onClick={printMap}>
                  Export Image
                </Button>
              </div>
              <div className="map-and-progressbar" id="idCustomCompanyView">
                <div className="expand-custom-world-map">
                  <CustomCompanyMap
                    expand={expandMap}
                    minMapWidth={0}
                    maxMapWidth={800}
                    minMapHeight={0}
                    maxMapHeight={600}
                  ></CustomCompanyMap>
                </div>
              </div>
            </Box>
          </div>
        </Dialog>
      </div>
      <div className="right-map-container">
        <h3 className="headerName">Company View</h3>
        <CountryPicker></CountryPicker>
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
      <CustomCompanyMap
        expand={expandMap}
        getRatings={ratings.getRatings}
        years={ratings.years}
        weight={ratings.weight}
        minMapWidth={0}
        maxMapWidth={800}
        minMapHeight={0}
        maxMapHeight={600}
      ></CustomCompanyMap>
    </>
  );
};

export default RightMap;
