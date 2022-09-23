/* eslint-disable no-console */

import React, { useState, useEffect, useContext } from "react";

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

const CustomWorldMap = (ratings) => {
  const [data, setData] = useState([]);

  const [kZoom, setKZoom] = useState(1);

  const { ranges, updateRanges } = useContext(RangesContext);

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const { companyUser, updateCompanyUser } = useContext(CompanyUserContext);

  useEffect(() => {
    if (ratings.weight !== 0) {
      getWorldMapInfo(
        ratings.getRatings,
        ratings.years,
        UserService.getToken(),
        companyUser
      ).then((response) => {
        setData(response);
      });
    }
  }, [ratings.getRatings, ratings.years, ratings.weight]);

  const cordinates = (position, dragging, event) => {
    setKZoom(position.k);
  };

  const markers = [
    {
      markerOffset: -30,
      name: "Buenos Aires",
      coordinates: [-58.3816, -34.6037],
    },
    { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711] },
    { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] },
  ];
  return (
    <ComposableMap>
      <ZoomableGroup
        onMove={cordinates}
        zoom={1}
        //maxZoom={50}
        translateExtent={[
          [parseFloat(-ratings.minMapWidth), parseFloat(-ratings.minMapHeight)],
          [ratings.maxMapWidth, ratings.maxMapHeight],
        ]}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              let geoMap = new Map();

              if (Array.isArray(data)) {
                data.forEach((s) => {
                  if (s.country === geo.properties.name) {
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

        {markers.map(({ name, coordinates, markerOffset }) => {
          if (kZoom === 8) {
            return (
              <Marker key={name} coordinates={coordinates} fill="#777">
                <text textAnchor="" fill="#F53" fontSize={4}>
                  {name}
                </text>
              </Marker>
            );
          }
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default CustomWorldMap;
