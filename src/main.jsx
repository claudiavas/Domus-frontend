import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { InmueblesProvider } from './components/FilterHousing/HousingContextFilter.jsx';

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
import { ImagesProvider } from './components/Contexts/ImagesContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AuthProvider>
      <LocationProvider>
        <HousingProvider>
          <TranslationProvider>
            <ImagesProvider>
              <InmueblesProvider>
            <App />
            </ImagesProvider>
          </TranslationProvider>
          </InmueblesProvider>

        </HousingProvider>
      </LocationProvider>
    </AuthProvider>

  </React.StrictMode>,
)
