import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RoutesUrlPath from '../assets/RoutesUrlPath.js'

import Home from '../Pages/Home.js'
import Login from '../Pages/Login.js'
import TrainingsDetails from '../Pages/TrainingsDetails'

function AppRouter(): any {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={RoutesUrlPath.home} element={<Home />} />
      <Route
        path={RoutesUrlPath.trainings.trainings}
        element={<TrainingsDetails />}
      />
    </Routes>
  )
}

export default AppRouter
