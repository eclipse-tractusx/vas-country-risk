/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import { RangesContext } from "../../contexts/ranges";
import LeftMap from "./LeftMap/LeftMap";
import RightMap from "./RightMap/RightMap";
import DashboardTable from "./DashBoardTable/DashboardTable";
import DatePicker from "./DatePicker/DatePicker";
import Ratings from "./Ratings/Ratings";
import UploadDownloadZone from "./UploadDownloadZone/UploadDownloadZone";
import RangeSlider from "./RangeSlider/RangeSlider";

import Reports from "./Reports/Reports";

const Dashboard = () => {
  const { ranges, updateRanges } = useContext(RangesContext);

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
        <div className="maps-content ">
          <div className="left-map">
            <LeftMap
              getRatings={ratings}
              years={years}
              weight={weight}
            ></LeftMap>
          </div>
          <div className="right-map">
            <RightMap></RightMap>
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
          <DatePicker passYearSelected={passYearSelected}></DatePicker>
          <Ratings
            passValuesFromComponent={passValuesFromComponent}
            passAutomaticWeightChange={passAutomaticWeightChange}
            years={years}
          ></Ratings>
        </div>
        <div>
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
