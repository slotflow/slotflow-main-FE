import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { planAccessMap } from "@/utils/constants";
import { RootState } from "@/utils/redux/appStore";

interface PlanGuardProps {
  routeName: string;
  children: React.ReactNode;
}

const PlanGuard = ({ routeName, children }: PlanGuardProps) => {
  const user = useSelector((store: RootState) => store.auth.authUser);
  const planName = user?.providerSubscription || "NoSubscription";
  const allowedRoutes = planAccessMap[planName] || [];

  if (!allowedRoutes.includes(routeName)) {
    return <Navigate to="/provider" replace />;
  }

  return <>{children}</>;
};

export default PlanGuard;
