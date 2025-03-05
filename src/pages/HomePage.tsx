import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../utils/redux/appStore";
import RoleButton from "../components/homepage/RoleButton";
import { changeAdmin, changeProvider, changeUser } from "../utils/redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRoleSelection = useCallback(
    (user: boolean, provider: boolean) => {
      dispatch(changeUser(true));
      dispatch(changeProvider(false));
      dispatch(changeAdmin(false));

      if (user) {
        dispatch(changeUser(true));
        dispatch(changeProvider(false));
      } else if (provider) {
        dispatch(changeProvider(true));
        dispatch(changeUser(false));
      } else {
        dispatch(changeAdmin(false));
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