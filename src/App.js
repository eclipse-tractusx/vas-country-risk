import Dashboard from "./components/dashboard/dashboard";
import "./App.scss";
import { RatesProvider } from "./contexts/rates";
import { PageHeader } from "cx-portal-shared-components";
import { Footer } from "./components/dashboard/Footer/Footer";
import { RangesProvider } from "./contexts/ranges";
import { CountryProvider } from "./contexts/country";
import { CompanyUserProvider } from "./contexts/companyuser";
import { ReportProvider } from "./contexts/reports";

function App() {
  return (
    <>
      <RatesProvider>
        <RangesProvider>
          <CountryProvider>
            <CompanyUserProvider>
              <ReportProvider>
                <div className="App-pageheader">
                  <PageHeader title="Dashboard" headerHeight={200}></PageHeader>
                </div>
                <div className="App">
                  <Dashboard />
                  <Footer />
                </div>
              </ReportProvider>
            </CompanyUserProvider>
          </CountryProvider>
        </RangesProvider>
      </RatesProvider>
    </>
  );
}

export default App;
