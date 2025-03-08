import { Outlet } from "react-router-dom";
import SideBar from "../../components/admin/SideBar";

const Admin = () => {

  return (
    <div className="h-screen flex pt-16">
       <SideBar />
        <div className="w-[84%] p-4 mt-2 bg-[var(--background)]"> 
          <Outlet />
        </div>
    </div>

  )
}

export default Admin