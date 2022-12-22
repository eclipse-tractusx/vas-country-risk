import Dashboard from './components/dashboard/dashboard'
import './App.scss'
import { RatesProvider } from './contexts/rates'
import { PageHeader } from 'cx-portal-shared-components'
import { Footer } from './components/dashboard/Footer/Footer'
import { RangesProvider } from './contexts/ranges'
import { CountryProvider } from './contexts/country'
import { CompanyUserProvider } from './contexts/companyuser'
import { ReportProvider } from './contexts/reports'
import { ReloadProvider } from './contexts/refresh'
import { GatesProvider } from './contexts/gates'
import NavigationBar from './components/dashboard/NavigationBar/NavigationBar'
function App() {
  return (
    <>
      <GatesProvider>
        <RatesProvider>
          <RangesProvider>
            <CountryProvider>
              <CompanyUserProvider>
                <ReportProvider>
                  <ReloadProvider>
                    <div className="navbar">
                      <NavigationBar />
                    </div>
                    <div className="App-pageheader">
                      <PageHeader
                        title="Dashboard"
                        headerHeight={200}
                      ></PageHeader>
                    </div>
                    <div className="App">
                      <Dashboard />
                      <Footer />
                    </div>
                  </ReloadProvider>
                </ReportProvider>
              </CompanyUserProvider>
            </CountryProvider>
          </RangesProvider>
        </RatesProvider>
      </GatesProvider>
    </>
  )
}

export default App
