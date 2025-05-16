
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "../components/pages/App.tsx";
import PointCounting from "../components/pages/PointCounting.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "../components/pages/landingpage.tsx";
import MinorOpening from "../components/pages/MinorOpening.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/points" element={<PointCounting />} />
              <Route path="/minorOpening" element={<MinorOpening />} />
              <Route path="/bidding" element={<App />} />
              <Route path="/" element={<Landingpage />}> </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
