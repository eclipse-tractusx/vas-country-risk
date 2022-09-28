import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { getAll } from "../../services/dashboard-api";
import { getCountryByUser } from "../../services/countries-api";
import { CountryContext } from "../../../contexts/country";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const CustomCompanyMap = (ratings) => {
  const [data, setData] = useState([]);

  const [kZoom, setKZoom] = useState(1);

  const [coordsZoom, setCoordsZoom] = useState([]);

  const [coordsBP, setCoordsBP] = useState([]);

  const [zoomVar, setZoomVar] = useState(1);

  const { countryS, updateCountry } = useContext(CountryContext);

  let latCenter = 0;
  let longCenter = 0;

  console.log(zoomVar)

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

   /* for (let i = 0; i < coords.length; i++) {
      <Marker coordinates={coords[i]}>
      <circle r={2} fill="#F53" />
      </Marker>
    }*/

  const handleClick = geo => () => {
    console.log(geo);
    getCountryByUser(UserService.getToken()).then(        
      (response) => {
      for (let i = 0; i < response.length; i++) {
        if(geo.name == response[i].country){
          updateCountry(response[i])    
        }
      }
    }
  );
  };

  //Zoom in on country selected
  useEffect(() => {
    if(countryS != "none"){
      latCenter = countryS.longitude;
      longCenter = countryS.latitude;
      setCoordsZoom([latCenter,longCenter])
      setZoomVar(5);
    }
    else{
      setCoordsZoom([0,0])
      setZoomVar(1);
    }
  }, [countryS]);

  //Gets all Coords
  useEffect(() => {
    if (ratings.country !== null || ratings.country !== "") {
      getAll(ratings.getRatings, ratings.years, UserService.getToken()).then(
        (response) => {
          const array = [];
          for (let i = 0; i < response.length; i++) {
            if(ratings.country == response[i].country){
              array.push([response[i].longitude, response[i].latitude]);
            }
          }
          setCoordsBP(array);
          console.log(array)
        }
      );
    }
  }, [ratings.country]);

  const coordinates = (position, dragging, event) => {
    setKZoom(position.k);
  };

  return (
    <ComposableMap>
      console.log(latCenter)
      <ZoomableGroup
        onMove={coordinates}
        center={coordsZoom}
        zoom={zoomVar}
        translateExtent={[
          [parseFloat(-ratings.minMapWidth), parseFloat(-ratings.minMapHeight)],
          [ratings.maxMapWidth, ratings.maxMapHeight],
        ]}
      >
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let geoMap = new Map();
                  if (countryS.country === geo.properties.name) {
                      geoMap.set("color", "green");
                      geoMap.set(geo, geo);
                  }
              return (
                <Geography 
                  key={geoMap.size > 0 ? geoMap.get(geo).rsmKey : geo.rsmKey}
                  geography={geoMap.size > 0 ? geoMap.get(geo) : geo}
                  onClick={handleClick(geo.properties)}
                  fill={geoMap.size > 0 ? geoMap.get("color") : "#F5F4F6"}
                  style={{
                    default: {
                      stroke: "#607D8B",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      stroke: "#607D8B",
                      strokeWidth: 1,
                      outline: "none",
                    },
                    pressed: {
                      stroke: "#607D8B",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default CustomCompanyMap;

