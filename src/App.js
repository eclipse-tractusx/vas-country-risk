import Dashboard from "./components/dashboard/dashboard";
import "./App.scss";
import { RatesProvider } from "./contexts/rates";

function App() {
  return (
    <RatesProvider>
      <Dashboard />
    </RatesProvider>
  );
}

export default App;
