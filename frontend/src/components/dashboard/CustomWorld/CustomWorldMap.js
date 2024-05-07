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
/* eslint-disable no-console */

import { useState, useEffect, useContext } from "react";
import ReactTooltip from "react-tooltip";
import { getWorldMapInfo } from "../../services/dashboard-api";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { RangesContext } from "../../../contexts/ranges";
import UserService from "../../services/UserService";
import { CompanyUserContext } from "../../../contexts/companyuser";
import { getCountrys } from "../../services/country-api";
import { getBpns } from "../../services/bpns-api";
import ImageMarker from "../../../resources/marker.png";
import { GatesContext } from "../../../contexts/gates";

const CustomWorldMap = (ratings) => {
  const [data, setData] = useState([]);
  const [countryMarkers, setCountryMarkers] = useState([]);
  const [content, setContent] = useState("");
  const [kZoom, setKZoom] = useState(1);
  const [bpns, setBpns] = useState([]);
  const { gates, updateGate } = useContext(GatesContext);

  const { ranges, updateRanges } = useContext(RangesContext);

  const geoUrl = require("./world-countries.json");

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

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

  useEffect(() => {
    getCountrys(UserService.getToken(), companyUser).then((response) => {
      setCountryMarkers(response);
    });

    getBpns(UserService.getToken(), companyUser).then((response) => {
      setBpns(response);
    });
  }, []);

  const cordinates = (position, dragging, event) => {
    setKZoom(position.zoom);
  };

  const handlePopoverClose = () => {
    setContent("");
  };

  return (
    <>
      <ComposableMap data-testid="Map">
        <ZoomableGroup
          data-testid="ZoomableGroup"
          data-tip=""
          onMove={cordinates}
          zoom={1}
          maxZoom={50}
          translateExtent={[
            [
              parseFloat(-ratings.minMapWidth),
              parseFloat(-ratings.minMapHeight),
            ],
            [ratings.maxMapWidth, ratings.maxMapHeight],
          ]}
        >
          <Geographies geography={geoUrl} data-testid="geo">
            {({ geographies }) =>
              geographies.map((geo) => {
                let geoMap = new Map();

                if (Array.isArray(data)) {
                  data.forEach((s) => {
                    if (s.country.iso3 === geo.id) {
                      if (s.score >= ranges[2][0]) {
                        geoMap.set("color", "green");
                        geoMap.set(geo, geo);
                      } else if (
                        s.score >= ranges[1][0] &&
                        s.score < ranges[2][0]
                      ) {
                        geoMap.set("color", "yellow");
                        geoMap.set(geo, geo);
                      } else if (s.score < ranges[1][0] && s.score > 0) {
                        geoMap.set(geo, geo);
                        geoMap.set("color", "red");
                      } else if (s.score <= 0) {
                        geoMap.set(geo, geo);
                        geoMap.set("color", "#F5F4F6");
                      }
                    }
                  });
                }
                return (
                  <Geography
                    key={geoMap.size > 0 ? geoMap.get(geo).rsmKey : geo.rsmKey}
                    geography={geoMap.size > 0 ? geoMap.get(geo) : geo}
                    fill={geoMap.size > 0 ? geoMap.get("color") : "#F5F4F6"}
                    data-testid={`geo-show-marker-${geo.id}`}
                    onMouseEnter={() => {
                      countryMarkers.forEach((s) => {
                        data.forEach((d) => {
                          if (d.country.iso3 === s.iso3) {
                            if (s.iso3 === geo.id) {
                              setContent(
                                <div>
                                  <div>Country: {s.country}</div>
                                  <div>BPNs: {s.totalBpn}</div>
                                  <div>Score: {d.score}</div>
                                </div>
                              );
                            }
                          }
                        });
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

          {countryMarkers.map((marker) => {
            if (kZoom >= 3) {
              return (
                <Marker
                  key={marker.iso3}
                  coordinates={[marker.longitude, marker.latitude]}
                  onMouseEnter={() => {
                    setContent(marker.country);
                  }}
                  onMouseLeave={handlePopoverClose}
                >
                  <g>
                    <image
                      //href={ImageMarker}
                      x="-2.2"
                      y="-3"
                      height="0.5%"
                      width="0.5%"
                    />
                  </g>
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

          {bpns.map((bpn) => {
            if (kZoom >= 10) {
              return (
                <Marker
                  onMouseEnter={() => {
                    setContent(
                      <div>
                        <div>{bpn.legalName}</div>
                        <div>{bpn.address}</div>
                        <div>{bpn.city}</div>
                      </div>
                    );
                  }}
                  onMouseLeave={handlePopoverClose}
                  key={bpn.iso3}
                  coordinates={[bpn.longitude, bpn.latitude]}
                >
                  <g>
                    <image
                      href={ImageMarker}
                      x="-2.2"
                      y="-3"
                      height="0.5%"
                      width="0.5%"
                    />
                  </g>
                  <text textAnchor="" fill="#000" fontSize={0.25}></text>
                </Marker>
              );
            }
          })}
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default CustomWorldMap;
