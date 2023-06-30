import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import { CssBaseline } from '@mui/material';
import { AuthProvider } from './components/Contexts/AuthContext.jsx';
import { LocationProvider } from './components/Contexts/LocationContext.jsx';
import { HousingProvider } from './components/Contexts/HousingContext.jsx';
import { TranslationProvider } from './components/Contexts/TranslationContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline/>
    <AuthProvider>
      <LocationProvider>
        <HousingProvider>
          <TranslationProvider>
            <App />
          </TranslationProvider>
        </HousingProvider>
      </LocationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
