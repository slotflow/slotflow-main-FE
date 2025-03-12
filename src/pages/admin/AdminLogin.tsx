import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import LoginForm from "@/components/form/LoginForm";
import { FormFilling } from "../../components/svgs/FormFilling";

const AdminLogin = () => {

  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  useEffect(() => {
    if(authUser && authUser.role === "ADMIN"){
      navigate("/admin");
    }
  }, [authUser, navigate]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <LoginForm isAdmin={true} role={"ADMIN"} />
      </div>
    </div>
  )
}

export default AdminLogin