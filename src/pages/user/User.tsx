// import SideBar from "@/components/navs/SideBar"
import { Outlet } from "react-router-dom"

const User = () => {
  return (
    <div className="h-screen flex">
       {/* <SideBar /> */}
        <div className="w-[84%] p-4 bg-[var(--background)]"> 
          <Outlet />
        </div>
    </div>
  )
}

export default User