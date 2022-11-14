import { render, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import App from "../../../App";
import { RatesProvider } from "../../../contexts/rates";
import { RangesProvider } from "../../../contexts/ranges";
import { CountryProvider } from "../../../contexts/country";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { ReportProvider } from "../../../contexts/reports";
import { ReloadProvider } from "../../../contexts/refresh";

test("Renders App.js", async () => {

    await act(async () => {
        (render(
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