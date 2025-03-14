import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRoutes } from "@/utils/constants";
import Sidebar from "@/components/Navs/Sidebar";
import { RootState } from "@/utils/redux/appStore";

const User = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  return (
      <div className="flex h-screen pt-16">
        <Sidebar routes={userRoutes} />
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'} transition-all duration-300`}>
          <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6 bg-[var(--background)] ">
            <Outlet />
          </div>
        </div>
      </div>
  )
}

export default User