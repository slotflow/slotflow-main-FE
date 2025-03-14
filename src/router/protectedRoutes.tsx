import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";

type UserRoles = "ADMIN" | "USER" | "PROVIDER";

interface ProtectedRouteProps {
  allowedRoles: (UserRoles)[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useSelector((store: RootState) => store.auth.authUser);

  if (!user || !user.role) {
    console.log("to home from one")
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user?.role as UserRoles)) {
    console.log("to home from two")
    return <Navigate to="/" replace />;
  }

  return children;
};
