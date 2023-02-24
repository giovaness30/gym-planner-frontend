import { Button } from 'antd'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import MenuList from '../Components/MenuList'
import ContextProvider, { AppContext, authUser } from '../Contexts/Context'
import { IsLogged } from '../Routes/AuthUtils'
import RequireAuth from '../Routes/RequireAuth'
import { authLogout } from '../Services/AuthStoreServices'

const layout = (props: any) => {
  const { auth }: any = authUser()

  return (
    <RequireAuth>
      <div className="page">
        <div
          id="conteiner"
          className="bg-white rounded-xl shadow-lg w-2/3 m-auto mt-10 pb-10"
        >
          {auth?.currentUser && (
            <div className="flex justify-start pt-5 ml-2">
              <MenuList />
            </div>
          )}
          <div className=" py-5">
            <div className="text-xl font-medium text-black w-auto">
              Gym Planner
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </RequireAuth>
  )
}
export default layout
