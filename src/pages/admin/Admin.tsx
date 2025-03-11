import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "@/components/navs/SideBar";
import { adminRoutes } from "@/utils/constants";
import { RootState } from "@/utils/redux/appStore";

const Admin = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  return (
    <div className="h-screen flex">
       <SideBar routes={adminRoutes} />
        <div className={`transition-all duration-300 p-4 bg-[var(--background)] ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'}`}> 
          <Outlet />
        </div>
    </div>

  )
}

export default Admin