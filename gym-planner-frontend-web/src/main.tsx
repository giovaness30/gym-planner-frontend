import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout/Layout'
import AppRouter from './Routes/Router'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './Contexts/Context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ContextProvider>
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  </ContextProvider>
  // </React.StrictMode>
)
