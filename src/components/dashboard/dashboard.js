/* eslint-disable no-console */
import React, { useState } from "react";
import { Button } from "cx-portal-shared-components";
import "./styles.scss";
import DashboardTable from "./DashboardTable";
import DatePicker from "./DatePicker";
import RangeSlider from "./RangeSlider";
import RatingsTable from "./RatingsTable";
import UploadButton from "./UploadButton";
import { getAll } from "../services/dashboard-api";
import CustomWorldMap from "./CustomWorldMap";

const Dashboard = () => {
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
        <div className="maps">
          <CustomWorldMap getRatings={ratings} years={years}></CustomWorldMap>
          <img alt="mapping" className="right-map" src="right_map.PNG"></img>
        </div>

        <DashboardTable getRatings={ratings} years={years}></DashboardTable>
      </div>
      <div className="right-content">
        <div className="right-upper-content">
          <div className="right-data-picker-content">
            <DatePicker
              className="DateForm"
              passYearSelected={passYearSelected}
            ></DatePicker>
          </div>
          <div className="divider"></div>
          <div className="right-upper-right-content">
            <Button title="RefreshButton" onClick={() => getAll(ratings)}>
              Refresh
            </Button>
          </div>
        </div>
        <div>
          <RatingsTable
            passValuesFromComponent={passValuesFromComponent}
            years={years}
          ></RatingsTable>
        </div>
        <div className="right-middle-bottom-content">
          <UploadButton></UploadButton>
        </div>
        <div className="right-bottom-content">
          <div className="slider-header">
            <Button className="SaveRange" size="small">
              Save Ranges
            </Button>
          </div>
          <RangeSlider></RangeSlider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
