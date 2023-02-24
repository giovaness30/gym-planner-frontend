import { getAuth, onAuthStateChanged } from 'firebase/auth'

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { IsRootRoute } from './AuthUtils'

function RequireAuth({ children }) {
  const auth = getAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    onAuthStateChanged(auth, isUser => {
      if (!isUser && !IsRootRoute()) {
        navigate('/')
        // location.reload()
        localStorage.removeItem('token')
      }
    })
  })
  return children
}

export default RequireAuth
