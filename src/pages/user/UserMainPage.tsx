import { Suspense } from "react";
import { userRoutes } from "@/utils/constants";
import Sidebar from "@/components/Navs/Sidebar";
import InfoHeader from "@/components/Navs/InfoHeader";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LoadingFallback from "../common/LoadingFallback";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import FilterRightSideBar from "@/components/Navs/FilterRightSideBar";
import { toggleFilterSideBar } from "@/utils/redux/slices/stateSlice";

const UserMainPage = () => {

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((store: RootState) => store.auth.authUser);
  const { sidebarOpen } = useSelector((store: RootState) => store.state);

  return (
    <div className="flex h-screen bg-[var(--background)] transition all duration-300">
      <Sidebar routes={userRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[85%]' : 'w-[95%]'} transition-all duration-300`}>
        <InfoHeader profileImage={user?.profileImage ?? "/images/avatar.png"} username={user?.username ?? ""} />
        <div className="flex-1 overflow-y-auto overscroll-y-contain relative no-scrollbar px-2">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
          {location?.pathname === '/user/dashboard' && (
            <FilterRightSideBar onClose={() => dispatch(toggleFilterSideBar())} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMainPage