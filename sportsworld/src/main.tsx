import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AthleteProvider } from './contexts/AthleteContext.tsx'
import { FinanceProvider } from './contexts/FinanceContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FinanceProvider>
      <AthleteProvider>
        <App />
      </AthleteProvider>
    </FinanceProvider>
  </StrictMode>,
)
