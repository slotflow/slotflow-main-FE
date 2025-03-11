import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoutes } from "@/utils/constants";
import SideBar from "@/components/navs/SideBar";
import { RootState } from "@/utils/redux/appStore";

const User = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  return (
    <div className="h-screen flex">
       <SideBar routes={userRoutes}/>
       <div className={`transition-width duration-300 p-4 bg-[var(--background)] ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'}`}> 
          <Outlet />
        </div>
    </div>
  )
}

export default User