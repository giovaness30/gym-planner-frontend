import React from 'react'
import '../App.css'
import MenuList from '../Components/MenuList'

const layout = (props: any) => {
  return (
    <div className="page">
      <div
        id="conteiner"
        className="bg-white rounded-xl shadow-lg w-2/3 m-auto mt-10 pb-10"
      >
        <div className="flex justify-start pt-5 ml-2">
          <MenuList />
        </div>
        <div className=" py-5">
          <div className="text-xl font-medium text-black w-auto">
            Gym Planner
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}
export default layout
