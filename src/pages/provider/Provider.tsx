import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "@/components/navs/Header";
import { providerRoutes } from "@/utils/constants";
import { RootState } from "@/utils/redux/appStore";
import Sidebar from "@/components/navs/AdminSidebar";
import { Bounce, ToastContainer } from "react-toastify";

const Provider = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme={themeMode ? "light" : "dark"}
        transition={Bounce}
      />
      <div className="flex h-screen">
        <Sidebar routes={providerRoutes} />
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'} transition-all duration-300`}>
          <Header />
          <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6 bg-[var(--background)] ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Provider