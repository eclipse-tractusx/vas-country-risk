/* eslint-disable no-console */
import React, { useState, useContext, useEffect } from "react";
import "./styles.scss";
import { sendValues } from "../services/ranges-api";
import { RangesContext } from "../../contexts/ranges";
import LeftMap from "./LeftMap/LeftMap";
import DashboardTable from "./DashBoardTable/DashboardTable";
import DatePicker from "./DatePicker/DatePicker";
import Ratings from "./Ratings/Ratings";
import UploadDownloadZone from "./UploadDownloadZone/UploadDownloadZone";
import RangeSlider from "./RangeSlider/RangeSlider";

const Dashboard = () => {
  const { ranges, updateRanges } = useContext(RangesContext);

  const [ratings, setRatings] = useState("");

  const [years, setYears] = useState("");

  const passValuesFromComponent = (rates) => {
    setRatings(rates);
  };

  const passYearSelected = (yearSelected) => {
    setYears(yearSelected);
  };

  return (
    <div className="wrapper">
      <div className="main-content">
        <div className="maps-content ">
          <LeftMap getRatings={ratings} years={years}></LeftMap>
          {/* <LeftMap getRatings={ratings} years={years}></LeftMap> */}
        </div>
        <div className="table-content">
          <DashboardTable getRatings={ratings} years={years}></DashboardTable>
        </div>
      </div>
      <div className="right-content">
        <div className="right-top-content">
          <DatePicker passYearSelected={passYearSelected}></DatePicker>
          <Ratings
            passValuesFromComponent={passValuesFromComponent}
            years={years}
          ></Ratings>
        </div>
        <div className="right-middle-content">
          <UploadDownloadZone></UploadDownloadZone>
        </div>
        <div className="right-bottom-content">
          <RangeSlider></RangeSlider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
