import SideBar from "@/components/navs/SideBar"
import { userRoutes } from "@/utils/constants"
import { Outlet } from "react-router-dom"

const User = () => {
  return (
    <div className="h-screen flex">
       <SideBar routes={userRoutes}/>
        <div className="w-[84%] p-4 bg-[var(--background)]"> 
          <Outlet />
        </div>
    </div>
  )
}

export default User