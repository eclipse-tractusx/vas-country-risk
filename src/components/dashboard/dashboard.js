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
import React, { useState, useContext } from "react";
import "./styles.scss";
import LeftMap from "./LeftMap/LeftMap";
import RightMap from "./RightMap/RightMap";
import DashboardTable from "./DashBoardTable/DashboardTable";
import DatePicker from "./DatePicker/DatePicker";
import Ratings from "./Ratings/Ratings";
import UploadDownloadZone from "./UploadDownloadZone/UploadDownloadZone";
import RangeSlider from "./RangeSlider/RangeSlider";
import Reports from "./Reports/Reports";
import GatePicker from "./GatePicker/GatePicker";

import PrintMap from "./PrintMap/PrintMap";

const Dashboard = () => {
  const [ratings, setRatings] = useState("");

  const [weight, setTotalWeight] = useState("");

  const [years, setYears] = useState("");

  const passValuesFromComponent = (rates) => {
    setRatings(rates);
  };

  const passAutomaticWeightChange = (weight) => {
    setTotalWeight(weight);
  };

  const passYearSelected = (yearSelected) => {
    setYears(yearSelected);
  };

  return (
    <div className="wrapper">
      <div className="main-content">
      <div className="hidden-div">
        <PrintMap              
          getRatings={ratings}
          years={years}
          weight={weight}>
        </PrintMap>
      </div>
        <div className="maps-content ">
          <div className="left-map">
            <LeftMap
              getRatings={ratings}
              years={years}
              weight={weight}
            ></LeftMap>
            
          </div>
          <div className="right-map">
            <RightMap
              getRatings={ratings}
              years={years}
              weight={weight}
            ></RightMap>
          </div>
        </div>
        <div className="table-content">
          <DashboardTable
            getRatings={ratings}
            years={years}
            weight={weight}
          ></DashboardTable>
        </div>
      </div>
      <div className="right-content">
        <div className="right-top-content">
          <div className="dropdown-content">
            <div className="dropdown-content-left">
              <DatePicker passYearSelected={passYearSelected}></DatePicker>
            </div>
            <div className="dropdown-content-right">
              <GatePicker passYearSelected={passYearSelected}></GatePicker>
            </div>
          </div>
          <Ratings
            passValuesFromComponent={passValuesFromComponent}
            passAutomaticWeightChange={passAutomaticWeightChange}
            years={years}
          ></Ratings>
          <UploadDownloadZone></UploadDownloadZone>
        </div>

        <div className="right-middle-content">
          <Reports></Reports>
        </div>
        <div className="right-bottom-content">
          <RangeSlider></RangeSlider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


