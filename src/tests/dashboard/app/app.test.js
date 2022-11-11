import { render, screen, act } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../../../App";
import { RatesProvider } from "../../../contexts/rates";
import { PageHeader } from "cx-portal-shared-components";
import { Footer } from "../../../components/dashboard/Footer/Footer";
import { RangesProvider } from "../../../contexts/ranges";
import { CountryProvider } from "../../../contexts/country";
import { CompanyUserProvider } from "../../../contexts/companyuser";
import { ReportProvider } from "../../../contexts/reports";
import { ReloadProvider } from "../../../contexts/refresh";

test("Renders Left Map", async () => {

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