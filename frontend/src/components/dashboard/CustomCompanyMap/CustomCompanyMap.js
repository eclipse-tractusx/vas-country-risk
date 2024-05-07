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
import React, { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { getAll } from "../../services/dashboard-api";
import { CountryContext } from "../../../contexts/country";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { getCountryByUser, getCountrys } from "../../services/country-api";
import ReactTooltip from "react-tooltip";
import ImageMarker from "../../../resources/marker.png";
import { ReportContext } from "../../../contexts/reports";
import { getWorldMapInfo } from "../../services/dashboard-api";
import { GatesContext } from "../../../contexts/gates";

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const CustomCompanyMap = (ratings) => {
  //Zoom in and out const
  const [kZoom, setKZoom] = useState(1);

  //Constant for Country Zoom Coordinates
  const [coordsZoom, setCoordsZoom] = useState([0, 0]);

  //Business Partners Coords
  const [coordsBP, setCoordsBP] = useState([]);

  //Constant for Zoom variation
  const [zoomVar, setZoomVar] = useState(1);

  //Selected country
  const { countryS, updateCountry } = useContext(CountryContext);

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  //Content for the ISO Marker
  const [content, setContent] = useState("");

  //Marker for the ISO code
  const [countryMarkers, setCountryMarkers] = useState([]);

  //Content for the BP markers
  const [bpMarkers, setBpMarkers] = useState("");

  //Const with all saved coords
  const [savedCoords, setSavedCoords] = useState([]);

  //Const with all saved coords
  const [savedCountries, setSavedCountries] = useState([]);

  //Gates Context
  const { gates, updateGate } = useContext(GatesContext);

  //Score for each country
  const [data, setData] = useState([]);

  const { reportValuesContext, updateReport } = useContext(ReportContext);

  useEffect(() => {
    const reportCountry = reportValuesContext.filter(
      (r) => r.name === "Country"
    );

    if (!ratings.expand) {
      updateCountry(
        reportCountry.length && !Array.isArray(reportCountry[0].objectValue)
          ? reportCountry[0].objectValue
          : "none"
      );
    }
  }, [reportValuesContext]);

  const geoUrl = require("./world-countries.json");

  //Method for getting the name of current selected country
  const handleClick = (geo) => () => {
    savedCountries.forEach((ac) => {
      if (geo["Alpha-2"] === ac.iso2) {
        updateCountry(ac);
      }
    });
  };

  //Zoom in on country selected
  useEffect(() => {
    if (countryS !== "none") {
      setCoordsZoom([countryS.longitude, countryS.latitude]);
      setZoomVar(5);
    } else {
      setCoordsZoom([0, 0]);
      setZoomVar(1);
    }
  }, [countryS]);

  //Gets all Coords for selected country
  useEffect(() => {
    if (countryS.country !== "none") {
      let array = [];

      array = Array.isArray(savedCoords)
        ? savedCoords.filter((acc) => countryS.country === acc.country)
        : [];
      setCoordsBP(array);
    }
  }, [countryS.country]);

  useEffect(() => {
    //Call to get all countries relative to the user
    getCountryByUser(UserService.getToken(), companyUser).then((response) => {
      setSavedCountries(response);
    });
    //Gets all Coords once started and saves
    getAll(
      ratings.getRatings,
      ratings.years,
      UserService.getToken(),
      companyUser
    ).then((response) => {
      setSavedCoords(response);
    });
    //Call to get all country coords
    getCountrys(UserService.getToken(), companyUser).then((response) => {
      setCountryMarkers(response);
    });
  }, []);

  //Get Score Based on selected Ratings
  useEffect(() => {
    if (ratings.weight !== 0) {
      getWorldMapInfo(
        ratings.getRatings,
        ratings.years,
        UserService.getToken(),
        companyUser,
        gates
      ).then((response) => {
        setData(response);
      });
    }
  }, [ratings.getRatings, ratings.years, ratings.weight, gates]);

  const coordinates = (position, dragging, event) => {
    setKZoom(position.zoom);
  };

  const handlePopoverClose = () => {
    setContent("");
  };

  const getScore = (s) => {
    const element = data.find((d) => d.country.iso3 === s.iso3);
    if (data.length) {
      if (element && element.score) {
        return element.score;
      } else {
        return " No Score Available";
      }
    } else {
      if (element && element.score) {
        return element.score;
      } else {
        return " No Rating Selected";
      }
    }
  };

  return (
    <>
      <ComposableMap data-testid="composable-custom-company-map">
        <ZoomableGroup
          data-tip=""
          data-testid="zoomableGroup-custom-company-map"
          onMove={coordinates}
          center={coordsZoom}
          zoom={zoomVar}
          maxZoom={50}
          translateExtent={[
            [
              parseFloat(-ratings.minMapWidth),
              parseFloat(-ratings.minMapHeight),
            ],
            [ratings.maxMapWidth, ratings.maxMapHeight],
          ]}
        >
          <Geographies geography={geoUrl} data-testid="geo-custom-company-map">
            {({ geographies }) =>
              geographies.map((geo) => {
                let geoMap = new Map();

                if (countryS.iso2 === geo.properties["Alpha-2"]) {
                  geoMap.set("color", "#82e362");
                  geoMap.set(geo, geo);
                }
                return (
                  <Geography
                    data-testid={`geo-show-marker-${geo.id}`}
                    key={geoMap.size > 0 ? geoMap.get(geo).rsmKey : geo.rsmKey}
                    geography={geoMap.size > 0 ? geoMap.get(geo) : geo}
                    onClick={handleClick(geo.properties)}
                    fill={geoMap.size > 0 ? geoMap.get("color") : "#F5F4F6"}
                    onMouseEnter={() => {
                      countryMarkers.forEach((s) => {
                        if (s.iso2 === geo.properties["Alpha-2"]) {
                          setContent(
                            <div>
                              <div>Country: {s.country}</div>
                              <div>BPNs: {s.totalBpn}</div>
                              <div>Score: {getScore(s)}</div>
                            </div>
                          );
                        }
                      });
                    }}
                    onMouseLeave={handlePopoverClose}
                    style={{
                      default: {
                        stroke: "#4d493f",
                        strokeWidth: 0.2,
                        outline: "none",
                      },
                      hover: {
                        stroke: "#4d493f",
                        strokeWidth: 0.1,
                        outline: "none",
                        fill: "#82e362",
                      },
                      pressed: {
                        stroke: "#4d493f",
                        strokeWidth: 0.1,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {coordsBP.map((marker) => {
            if (kZoom >= 3) {
              return (
                <Marker
                  coordinates={[marker.longitude, marker.latitude]}
                  onMouseEnter={() => {
                    setBpMarkers(
                      <div>
                        <div>{marker.legalName}</div>
                        <div>{marker.address}</div>
                        <div>{marker.city}</div>
                      </div>
                    );
                  }}
                  onMouseLeave={() => {
                    setBpMarkers("");
                  }}
                >
                  <g>
                    <image
                      href={ImageMarker}
                      x={kZoom >= 15 ? "-1" : "-3.7"}
                      y={kZoom >= 15 ? "-2" : "-3"}
                      height={kZoom >= 15 ? "0.3%" : "0.9%"}
                      width={kZoom >= 15 ? "0.3%" : "0.9%"}
                    />
                  </g>
                  <text textAnchor="" fill="#000" fontSize={0.5}>
                    {kZoom >= 15 ? marker.legalName : ""}
                  </text>
                </Marker>
              );
            }
          })}

          {countryMarkers.map((marker) => {
            if (kZoom >= 3) {
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
      <ReactTooltip>{bpMarkers}</ReactTooltip>
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default CustomCompanyMap;
