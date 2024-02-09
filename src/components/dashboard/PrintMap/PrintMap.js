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
import React, { useContext } from "react";
import CustomWorldMap from "../CustomWorld/CustomWorldMap";
import "./styles.scss";
import { RangesContext } from "../../../contexts/ranges";
import { GatesContext } from "../../../contexts/gates";
import Slider from "@mui/material/Slider";
import { ThreeDRotation } from "@mui/icons-material";

const PrintMap = (ratings) => {
  const { gates, updateGate } = useContext(GatesContext);

  const { ranges, updateRanges } = useContext(RangesContext);

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className=".left-map-container-print " id="printElement">
        <div className="value-title">Country Risk Dashboard - {formattedDate}</div>
      <div className="value-container">
        <div className="left-value">Year: {ratings.years}</div>
        <div className="right-value">Gate: {gates.gateName !== undefined ? gates.gateName : "Select a Gate"}
        </div>
      </div>
      <div className="map">
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
      <div className="sliderbox">
        <div className="slider-green">
          <div className="slider-value-left">{ranges[2][0]}</div>
          <Slider
            value={ranges[2]}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            disableSwap
          />
          <div className="slider-value-right">{ranges[2][1]}</div>
        </div>
        <div className="slider-yellow">
          <div className="slider-value-left">{ranges[1][0]}</div>
          <Slider
            value={ranges[1]}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            disableSwap
          />
          <div className="slider-value-right">{ranges[1][1]}</div>
        </div>
        <div className="slider-red">
          <div className="slider-value-left">{ranges[0][0]}</div>
          <Slider
            value={ranges[0]}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            disableSwap
          />
          <div className="slider-value-right">{ranges[0][1]}</div>
        </div>
      </div>
      <div className="table-container">
        <table className="ratings-table">
          <thead>
            <tr>
              <th className="data-cell">Ratings</th>
              <th className="weight-cell">Weight</th>
            </tr>
          </thead>
          <tbody>
            {ratings.getRatings.length > 0 ? (
              ratings.getRatings.map((rating) => (
                <tr key={rating.id}>
                  <td>{rating.dataSourceName}</td>
                  <td>{rating.weight}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No ratings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintMap;
