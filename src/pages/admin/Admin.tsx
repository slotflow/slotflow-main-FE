import { Outlet } from "react-router-dom";
import SideBar from "../../compoenents/admin/SideBar";

const Admin = () => {

  return (
    <div className="h-screen bg-gray-200 flex">
       <SideBar />
        <div className="w-[80%] p-4 bg-white shadow-md rounded-lg pt-20">
          <Outlet />
        </div>
    </div>
  )
}

export default Admin