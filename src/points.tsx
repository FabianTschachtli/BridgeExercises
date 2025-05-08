import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PointCounting from "./PointCounting.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PointCounting />
  </StrictMode>,
)
