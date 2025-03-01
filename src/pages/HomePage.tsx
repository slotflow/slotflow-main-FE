import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../utils/redux/appStore";
import RoleButton from "../components/homepage/RoleButton";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue } from "../utils/redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRoleSelection = useCallback(
    (user: boolean, provider: boolean) => {
      dispatch(changeUserTrue());
      dispatch(changeProviderFalse());
      dispatch(changeAdminFalse());

      if (user) {
        dispatch(changeUserTrue());
        dispatch(changeProviderFalse());
      } else if (provider) {
        dispatch(changeProviderTrue());
        dispatch(changeUserFalse());
      } else {
        dispatch(changeAdminFalse());
      }

      navigate("/login");
    },
    [dispatch, navigate]
  );

  return (
    <div className="h-screen flex justify-center items-center bg-[var(--background)] space-x-2">
      <RoleButton onClick={() => handleRoleSelection(true, false)}>
        Book An Appointment
      </RoleButton>
      <RoleButton onClick={() => handleRoleSelection(false, true)}>
        Provide A Service
      </RoleButton>
    </div>
  )
}

export default HomePage