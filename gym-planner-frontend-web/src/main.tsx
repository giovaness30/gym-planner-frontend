import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/Home'
import './index.css'
import Layout from './Layout/Layout'

import AppRouter from './Routes/Router'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <AppRouter />
    </Layout>
  </React.StrictMode>
)
