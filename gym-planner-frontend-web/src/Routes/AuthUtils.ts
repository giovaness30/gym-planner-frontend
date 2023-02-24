import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


export const IsRootRoute = () => {
  return (window.location.pathname === "/")
}

export const IsLogged = () => {
  const auth = getAuth()

  return {auth}
  

}