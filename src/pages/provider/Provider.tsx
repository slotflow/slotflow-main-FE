import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Navs/Sidebar";
import { providerRoutes } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStatus } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import ProviderAddAddress from "./ProviderAddAddress";
import ProviderAddServiceDetails from "./ProviderAddServiceDetails";
import ProviderAddServiceAvailability from "./ProviderAddServiceAvailability";
import ProviderApprovalPending from "./ProviderApprovalPending";

const Provider = () => {
  const sidebarOpen = useSelector((store: RootState) => store.state.sidebarOpen);
  const user = useSelector((state: RootState) => state.auth.authUser);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    if (user?.isLoggedIn) {
        dispatch(checkUserStatus());
    }
  }, [dispatch, location]);

console.log("User : ",user);
  if(!user?.approved){
    console.log("Not approved.");
    if(!user?.address){
      console.log("no address.");
      return (
        <ProviderAddAddress />
      );
    } else if(!user?.serviceDetails){
      console.log("No serviceDetails.");
      return (
        <ProviderAddServiceDetails />
      );
    } else if(!user?.serviceAvailability){
      console.log("No serviceAvailability");
      return (
        <ProviderAddServiceAvailability />
      )
    } else {
      console.log("Else");
      return (
        <ProviderApprovalPending />
      )
    }
  }


  return user?.approved && (
    <div className="flex h-screen pt-16">
        <Sidebar routes={providerRoutes} />
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'w-[84%]' : 'w-[94%]'} transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6 bg-[var(--background)] ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Provider