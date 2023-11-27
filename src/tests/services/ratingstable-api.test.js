/********************************************************************************
* Copyright (c) 2022,2023 BMW Group AG 
* Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
  getRatingsByYear,
  deleteRating,
} from "../../components/services/ratingstable-api";

import mockAxios from "jest-mock-axios";

jest.mock("axios");

describe("getRatingsByYear", () => {
  it("Ratings by year", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const year = "";
    const expectedResponse = [
      {
        id: 43,
        dataSourceName: "test",
        type: "Company",
        yearPublished: 2022,
        fileName: "test123",
      },
    ];

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await getRatingsByYear(year, token, customerUser);
    expect(response).toEqual(undefined);
  });

  it("should handle errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const year = 2023;
    const expectedError = "Error fetching ratings";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await getRatingsByYear(year, token, customerUser);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });

  //Delete Rating
  it("Gets data from selected gate", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const id = 43;

    const expectedResponse = { message: "Rating successfully deleted!" };

    axios.get.mockResolvedValueOnce(JSON.stringify({ data: expectedResponse }));

    const response = await deleteRating(token, customerUser, id);
    expect(response).toEqual(undefined);
  });

  it("should handle only errors", async () => {
    const token = "123456";
    const customerUser = {
      name: "John Doe",
      email: "john@doe.com",
      companyName: "Doe Inc.",
    };
    const id = 43;

    const expectedError = "Error deleting rating";

    axios.get.mockRejectedValueOnce(JSON.stringify({ data: expectedError }));

    try {
      await deleteRating(token, customerUser, id);
    } catch (error) {
      expect(error.message).toEqual(expectedError);
    }
  });
});


