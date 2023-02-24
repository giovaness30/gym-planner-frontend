import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate
} from 'react-router-dom'
import RoutesUrlPath from '../assets/RoutesUrlPath.js'

import Home from '../Pages/Home.js'
import Login from '../Pages/Login.js'
import TrainingsDetails from '../Pages/TrainingsDetails'
import { IsLogged } from './AuthUtils.js'
import PrivateRouters from './RequireAuth.js'

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
