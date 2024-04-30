// Main app component with router and routes

import {HashRouter, Routes, Route} from 'react-router-dom'
import {StockOverviewPage} from './pages/StockOverviewPage.jsx'
import {StockDetailPage} from './pages/StockDetailPage.jsx'
import {AppProvider} from './AppContext.jsx'
import './index.css'
import {ChangesRankingPage} from "./pages/ChangesRankingPage.jsx";

export default function App() {
    
  return (
      <AppProvider>
        <HashRouter>
            <Routes>
                <Route path="/" element={<StockOverviewPage/>}/>
                <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
                <Route path="/overview" element={<ChangesRankingPage/>}/>
            </Routes>
        </HashRouter>
      </AppProvider>
  )
}
