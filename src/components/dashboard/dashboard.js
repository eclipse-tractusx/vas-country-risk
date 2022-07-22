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


const Dashboard = () => {
  const [ratings, setRatings] = useState("");

  const passValuesFromComponent = (rates) => {
    setRatings(rates);
  };

  return (
    <div className="wrapper">
      <div className="main-content">
        <div className="maps">
          <img alt="mapping" className="left-map" src="left_map.PNG" />
          <img alt="mapping" className="right-map" src="right_map.PNG"></img>
        </div>
        <DashboardTable getRatings={ratings}></DashboardTable>
      </div>
      <div className="right-content">
        <div className="right-upper-content">
          <div className="right-upper-left-content">
            <DatePicker className="DateForm"></DatePicker>
          </div>
          <div className="divider"></div>
          <div className="right-upper-right-content">
            <Button title="RefreshButton" onClick={() => getAll(ratings)}>
              Refresh
            </Button>
          </div>
        </div>
        <div className="right-middle-content">
          <RatingsTable
            className="ratingtable"
            passValuesFromComponent={passValuesFromComponent}
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
