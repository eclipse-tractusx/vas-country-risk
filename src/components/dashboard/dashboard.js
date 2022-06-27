/* eslint-disable no-console */
import React, { useState ,useEffect} from "react";
import { getAll } from "../services/dashboard-api";
import { SearchInput, Table as Table2 } from "cx-portal-shared-components";
import myData from "./tableColumns.json";
import "./styles.scss";
import { DataGrid } from '@mui/x-data-grid';


const Dashboard = () => {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    getAll().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="main-content">
        <div className="maps">          
          <img alt="mapping" className= "left-map" src="left_map.PNG" />
          <img alt="mapping" className= "right-map" src="right_map.PNG">
          </img>
        </div>
        
        <Table2 className="table"
          title="Number of Filtered Business Partners:"
          columns={myData}
          rows={data}
          toolbar={{
            onSearch: function noRefCheck(){}
          }}
        ></Table2>

        
      </div>
      <div className="right-content">
      <h1>hi table</h1>
  
      <DataGrid
        rows={data}
        columns={myData}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      </div>
  
    </div>
  );
};

export default Dashboard;
