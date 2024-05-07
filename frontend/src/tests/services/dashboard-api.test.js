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
import axios from "axios";
import {
  getAll,
  getWorldMapInfo,
} from "../../components/services/dashboard-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getAll", () => {
  it("should get all info for table", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const gate = {
      id: 1,
      gateName: "BMW",
      companyGateValue: "",
    };
    const year = 2021;
    const ratings = {
      id: 3,
      dataSourceName: "African+Development+Bank+CPIA",
      type: "Global",
      yearPublished: 2021,
      fileName: null,
      weight: 100,
    };
    const expectedResponse = [
      {
        id: 1,
        bpn: "67-188-3753",
        legalName: "Hane-VonRueden",
        street: "Morrow",
        houseNumber: "830",
        zipCode: "62200",
        city: "Niutang",
        country: "China",
        score: 0,
        rating: "",
        longitude: "119.900272",
        latitude: "31.731975",
      },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getAll(ratings, year, token, customerUser, gate);
    expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const gate = {
      id: 1,
      gateName: "BMW",
      companyGateValue: "",
    };
    const year = 2021;
    const ratings = {
      id: 3,
      dataSourceName: "African+Development+Bank+CPIA",
      type: "Global",
      yearPublished: 2021,
      fileName: null,
      weight: 100,
    };
    const expectedError = "Error fetching all table info";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getAll(ratings, year, token, customerUser, gate);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });

  //World Map Fetch

  it("should fetch world map info", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const gate = {
      id: 1,
      gateName: "BMW",
      companyGateValue: "",
    };
    const year = 2021;
    const ratings = {
      id: 3,
      dataSourceName: "African+Development+Bank+CPIA",
      type: "Global",
      yearPublished: 2021,
      fileName: null,
      weight: 100,
    };
    const expectedResponse = [
      {
        country: {
          id: null,
          country: "Afghanistan",
          iso3: "AFG",
          iso2: "AF",
          continent: "WORLD",
          latitude: null,
          longitude: null,
          totalBpn: null,
        },
        score: 2.01,
      },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getWorldMapInfo(
      ratings,
      year,
      token,
      customerUser,
      gate
    );
    expect(response).toEqual(undefined);
  });

  it("should handle only errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const gate = {
      id: 1,
      gateName: "BMW",
      companyGateValue: "",
    };
    const year = 2021;
    const ratings = {
      id: 3,
      dataSourceName: "African+Development+Bank+CPIA",
      type: "Global",
      yearPublished: 2021,
      fileName: null,
      weight: 100,
    };
    const expectedError = "Error fetching WorldMapInfo";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getWorldMapInfo(ratings, year, token, customerUser, gate);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });
});
