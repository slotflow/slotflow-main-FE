import { Outlet } from "react-router-dom";
import SideBar from "@/components/navs/SideBar";
import { adminRoutes } from "@/utils/constants";

const Admin = () => {

  return (
    <div className="h-screen flex">
       <SideBar routes={adminRoutes} />
        <div className="w-[84%] p-4 bg-[var(--background)]"> 
          <Outlet />
        </div>
    </div>

  )
}

export default Admin