import { useEffect } from "react";
import Sidebar from "@/components/Navs/Sidebar";
import { providerRoutes } from "@/utils/constants";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "@/utils/apis/auth.api";
import ProviderAddAddressPage from "./ProviderAddAddressPage";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import ProviderApprovalPendingPage from "./ProviderApprovalPendingPage";
import ProviderAddServiceDetailsPage from "./ProviderAddServiceDetailsPage";
import ProviderAddServiceAvailabilityPage from "./ProviderAddServiceAvailabilityPage";

const ProviderMainPage = () => {

  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  const user = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    if (user?.isLoggedIn) {
        dispatch(checkUserStatus());
    }
  }, [dispatch, location]);

  if(!user?.approved){
    if(!user?.address){
      return (
        <ProviderAddAddressPage />
      );
    } else if(!user?.serviceDetails){
      return (
        <ProviderAddServiceDetailsPage />
      );
    } else if(!user?.serviceAvailability){
      return (
        <ProviderAddServiceAvailabilityPage />
      )
    } else {
      return (
        <ProviderApprovalPendingPage />
      )
    }
  }


  return user?.approved && (
    <div className="flex h-screen pt-16 bg-[var(--background)] transition-all duration-300">
        <Sidebar routes={providerRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[95%]'} transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProviderMainPage