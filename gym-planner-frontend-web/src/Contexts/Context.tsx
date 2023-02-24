import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AppContext: any = createContext({})

const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState<any>()

  const authFireBase = getAuth()

  useEffect(() => {
    const AuthFire = onAuthStateChanged(authFireBase, (currentUser: any) => {
      setAuth(currentUser?.auth)
    })

    return () => AuthFire()
  }, [])

  return <AppContext.Provider value={{ auth }}>{children}</AppContext.Provider>
}

export const authUser = () => {
  return useContext(AppContext)
}

export default ContextProvider
