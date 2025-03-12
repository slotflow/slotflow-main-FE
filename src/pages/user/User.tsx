import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import { userRoutes } from "@/utils/constants";
import Sidebar from "@/components/navs/SideBar";
import Header from "@/components/navs/Header";

const User = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  return (
    <div className="flex h-screen">
      <Sidebar routes={userRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'} transition-all duration-300`}>
        <Header />
        <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6 bg-[var(--background)] ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default User