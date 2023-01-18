import { render, act, getByLabelText, fireEvent } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { CountryProvider } from "../../../contexts/country";
import { RatesProvider } from "../../../contexts/rates";
import { RangesProvider } from "../../../contexts/ranges";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { ReportProvider } from '../../../contexts/reports'
import { ReloadProvider } from '../../../contexts/refresh'
import App from "../../../App";
import React, { useState } from "react";

test("Renders App", async () => {

  await act(async () => {
    ({} = render(
        <RatesProvider>
        <RangesProvider>
          <CountryProvider>
            <CompanyUserProvider>
              <ReportProvider>
                <ReloadProvider>
                    <App/>
                </ReloadProvider>
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RangesProvider>
      </RatesProvider>
    ));
  });
});


