import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../utils/redux/appStore";
import RoleButton from "../../components/homepage/RoleButton";
import { changeAdmin, changeProvider, changeUser } from "../../utils/redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRoleSelection = useCallback(
    (role: string, url: string) => {
      if(role === "USER"){
        dispatch(changeUser(true));
        dispatch(changeProvider(false));
        dispatch(changeAdmin(false));
        navigate(url)
      }else if(role === "PROVIDER"){
        dispatch(changeProvider(true));
        dispatch(changeUser(false));
        dispatch(changeAdmin(false));
        navigate(url)
      } 
    },
    [dispatch, navigate]
  );

  return (
    <div className="h-screen flex justify-center items-center bg-[var(--background)] space-x-2">
      <RoleButton onClick={() => handleRoleSelection("USER","/user/login")}>
        Book An Appointment
      </RoleButton>
      <RoleButton onClick={() => handleRoleSelection("PROVIDER","/provider/login")}>
        Provide A Service
      </RoleButton>
    </div>
  )
}

export default HomePage