import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminRoutes } from "@/utils/constants";
import Sidebar from "@/components/Navs/Sidebar";
import { RootState } from "@/utils/redux/appStore";

const AdminMainPage = () => {
  
  const sidebarOpen: boolean = useSelector((store: RootState) => store.state.sidebarOpen);

  return (
    <div className="flex h-screen pt-16 bg-[var(--background)] transition-all duration-300">
      <Sidebar routes={adminRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[95%]'} transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto overscroll-y-contain">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;