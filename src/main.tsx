
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import PointCounting from "./PointCounting.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./landingpage.tsx";
import MinorOpening from "./MinorOpening.tsx";

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
