import Dashboard from "./components/dashboard/dashboard";
import "./App.scss";
import { RatesProvider } from "./contexts/rates";
import { PageHeader } from "cx-portal-shared-components";
import { Footer } from "./components/dashboard/Footer";

function App() {
  return (
    <>
      <RatesProvider>
        <PageHeader title="Dashboard" headerHeight={200}></PageHeader>
        <Dashboard />
      </RatesProvider>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
