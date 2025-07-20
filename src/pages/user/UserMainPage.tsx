import { useEffect } from "react";
import { userRoutes } from "@/utils/constants";
import Sidebar from "@/components/Navs/Sidebar";
import InfoHeader from "@/components/Navs/InfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { checkUserStatus } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import FilterRightSideBar from "@/components/Navs/FilterRightSideBar";
import { toggleFilterSideBar } from "@/utils/redux/slices/stateSlice";

const UserMainPage = () => {

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.authUser);
  const { sidebarOpen } = useSelector((store: RootState) => store.state);

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(checkUserStatus());
    }
  }, [dispatch, location]);

  return (
    <div className="flex h-screen bg-[var(--background)] transition all duration-300">
      <Sidebar routes={userRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[85%]' : 'w-[95%]'} transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto overscroll-y-contain relative no-scrollbar px-2">
          <InfoHeader profileImage={user?.profileImage ?? "/images/avatar.png"} username={user?.username ?? ""}/>
          <Outlet />
          {location?.pathname === '/user/dashboard' && (
            <FilterRightSideBar onClose={() => dispatch(toggleFilterSideBar())} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMainPage