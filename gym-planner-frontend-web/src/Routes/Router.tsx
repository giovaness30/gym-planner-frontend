import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RoutesUrlPath from '../assets/RoutesUrlPath.js'

import Home from '../Pages/Home.js'
import TrainingsDetails from '../Pages/TrainingsDetails'

function AppRouter(): any {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={RoutesUrlPath.trainings.trainings}
          element={<TrainingsDetails />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
