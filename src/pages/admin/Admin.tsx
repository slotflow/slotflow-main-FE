import { adminRoutes } from "@/utils/constants";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";

const Admin = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  return (
    <div className="flex h-screen">
      <AdminSidebar routes={adminRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'} transition-all duration-300`}>
        <AdminHeader />
        <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6 bg-[var(--background)] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;