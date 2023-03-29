import { Button } from 'antd'
import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import MenuList from '../Components/MenuList'
import ContextProvider, { AppContext, authUser } from '../Contexts/Context'
import RequireAuth from '../Routes/RequireAuth'
import { authLogout } from '../Services/AuthStoreServices'

const layout = (props: any) => {
  const { auth }: any = authUser()

  return (
    <RequireAuth>
      <div className="page">
        <div
          id="conteiner"
          className="bg-white rounded-xl shadow-lg w-11/12 lg:w-3/4 2xl:w-2/4 m-auto mt-10 pb-10"
        >
          {auth?.currentUser && (
            <div className="flex justify-start pt-5 ml-2">
              <MenuList />
            </div>
          )}
          <div className=" py-5">
            <div className=" font-medium text-black w-auto">Gym Planner</div>
          </div>
          {props.children}
        </div>
      </div>
    </RequireAuth>
  )
}
export default layout
