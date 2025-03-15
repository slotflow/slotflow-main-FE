import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { userRoutes } from "@/utils/constants";
import Sidebar from "@/components/Navs/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";

const User = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  const user = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    if (user?.isLoggedIn && user?.token) {
      dispatch(checkUserStatus(user.token));
    }
  }, [user?.token, dispatch, location]);

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