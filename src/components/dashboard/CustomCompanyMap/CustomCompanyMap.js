import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { getAll } from "../../services/dashboard-api";
import { getCountryByUser } from "../../services/countries-api";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { getCountrys } from "../../services/country-api";
import ReactTooltip from "react-tooltip";

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

  //Constant for Country Zoom Coordinates
  const [coordsZoom, setCoordsZoom] = useState([]);

  const [coordsBP, setCoordsBP] = useState([]);

  //Constant for Zoom variation
  const [zoomVar, setZoomVar] = useState(1);

  const { countryS, updateCountry } = useContext(CountryContext);

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  const [content, setContent] = useState("");
  const [countryMarkers, setCountryMarkers] = useState([]);

  const [markercontent, setMarkercontent] = useState("");

  let latCenter = 0;
  let longCenter = 0;

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  /* for (let i = 0; i < coords.length; i++) {
     <Marker coordinates={coords[i]}>
     <circle r={2} fill="#F53" />
     </Marker>
   }*/

  const handleClick = geo => () => {
    console.log(geo);
    getCountryByUser(UserService.getToken(), companyUser).then(
      (response) => {
        for (let i = 0; i < response.length; i++) {
          if (geo.name == response[i].country) {
            updateCountry(response[i])
          }
        }
      }
    );
  };

  //Zoom in on country selected
  useEffect(() => {
    if (countryS != "none") {
      latCenter = countryS.longitude;
      longCenter = countryS.latitude;
      setCoordsZoom([latCenter, longCenter])
      setZoomVar(5);
    }
    else {
      setCoordsZoom([0, 0])
      setZoomVar(1);
    }
  }, [countryS]);

  //Gets all Coords
  useEffect(() => {
    if (countryS.country != "none") {
      getAll(ratings.getRatings,
        ratings.years,
        UserService.getToken(),
        companyUser).then(
          (response) => {
            const array = [];
            for (let i = 0; i < response.length; i++) {
              if (countryS.country == response[i].country) {
                array.push(response[i]);
              }
            }
            setCoordsBP(array);
          }
        );
    }
  }, [countryS.country]);

  const coordinates = (position, dragging, event) => {
    setKZoom(position.k);
  };

  const handlePopoverClose = () => {
    setContent("");
  };

  useEffect(() => {
    getCountrys(UserService.getToken(), companyUser).then((response) => {
      setCountryMarkers(response);
    });
  }, []);

  return (
    <>
      <ComposableMap data-tip="">
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
                  geoMap.set("color", "#82e362");
                  geoMap.set(geo, geo);
                }
                return (
                  <Geography
                    key={geoMap.size > 0 ? geoMap.get(geo).rsmKey : geo.rsmKey}
                    geography={geoMap.size > 0 ? geoMap.get(geo) : geo}
                    onClick={handleClick(geo.properties)}
                    fill={geoMap.size > 0 ? geoMap.get("color") : "#F5F4F6"}
                    onMouseEnter={() => {
                      countryMarkers.forEach((s) => {
                        if (s.country === geo.properties.name) {
                          setContent(s.country + " " + s.totalBpn);
                        }
                      });
                    }}
                    onMouseLeave={handlePopoverClose}
                    style={{
                      default: {
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none",
                        fill: "#F53",
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

          {coordsBP.map((marker) => {
            if (kZoom >= 3 && kZoom <= 20) {
              console.log(marker)
              return (
                <Marker
                  coordinates={[marker.longitude, marker.latitude]}
                  onMouseEnter={() => {
                    setMarkercontent(<div>
                      <div>Legal Name: {marker.legalName}</div>
                      <div>Address: {marker.address}</div>
                      <div>City: {marker.city}</div>
                    </div>
                    );
                  }}
                  onMouseLeave={() => {
                    setMarkercontent("");
                  }}>
                  <circle r={1} cx={2} cy={2} fill="#0c00ad"/>
                </Marker>
              );
            }
          })}

          {countryMarkers.map((marker) => {
            if (kZoom >= 3 && kZoom <= 20) {
              return (
                <Marker
                  key={marker.iso3}
                  coordinates={[marker.longitude, marker.latitude]}
                >
                  <text
                    textAnchor=""
                    fill="#000"
                    fontSize={kZoom >= 10 ? 1 : 2}
                  >
                    {marker.iso2}
                  </text>
                </Marker>
              );
            }
          })}

        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>{markercontent}</ReactTooltip>
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default CustomCompanyMap;

