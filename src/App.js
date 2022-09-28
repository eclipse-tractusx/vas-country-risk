import Dashboard from "./components/dashboard/dashboard";
import "./App.scss";
import { RatesProvider } from "./contexts/rates";
import { PageHeader } from "cx-portal-shared-components";
import { Footer } from "./components/dashboard/Footer";
import { RangesProvider } from "./contexts/ranges";
import { CountryProvider } from "./contexts/country";

function App() {
  return (
    <>
      <RatesProvider>
        <RangesProvider>
          <CountryProvider>
          <PageHeader title="Dashboard" headerHeight={200}></PageHeader>
          <Dashboard />
          </CountryProvider>
        </RangesProvider>
      </RatesProvider>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
