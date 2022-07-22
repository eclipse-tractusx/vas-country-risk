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
import { getRatingsByYear } from "../services/ratingstable-api";


const Dashboard = () => {
  const [ratings, setRatings] = useState("");
  const [date, setDate] = useState("");

  const passValuesFromComponent = (rates) => {
    setRatings(rates);
  };

  //Gets Year Currently selected in date picker
  const getValueFromDatePicker = (dt) => {
    setDate(dt);
  };


  return (
    <div className="wrapper">
      <div className="main-content">
        <div className="maps">
          <img alt="mapping" className="left-map" src="left_map.PNG" />
          <img alt="mapping" className="right-map" src="right_map.PNG"></img>
        </div>
        <DashboardTable getRatings={ratings} ></DashboardTable>
      </div>
      <div className="right-content">
        <div className="right-upper-content">
          <div className="right-upper-left-content">
            <DatePicker
              className="DateForm"
              getValueFromDatePicker={getValueFromDatePicker}
            ></DatePicker>
          </div>
          <div className="divider"></div>
          <div className="right-upper-right-content">
            <Button title="RefreshButton" onClick={() => /*getRatingsByYear(date)*/ getAll(ratings) }> 
              Refresh
            </Button>
          </div>
        </div>
        <div className="right-middle-content">
          <RatingsTable getYear={date}
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
