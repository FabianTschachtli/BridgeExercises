import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import PointCounting from "./PointCounting.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./landingpage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={<Landingpage />} />
                  <Route path="points" element={<PointCounting />} />
                  <Route path="bidding" element={<App />} />
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
