import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import  SignForm  from "../components/form/SignForm";
import { RootState } from "../utils/redux/appStore";
import FormFilling from "../components/svgs/FormFilling";

const Login = () => {

  const authUser = useSelector((state: RootState) => state.auth?.authUser);

  if (authUser) {
      if (authUser.role === "ADMIN") return <Navigate to="/admin" replace />;
      if (authUser.role === "USER") return <Navigate to="/user" replace />;
      if (authUser.role === "PROVIDER") return <Navigate to="/provider" replace />;
  }

  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
        <div className="md:w-6/12 hidden md:flex items-center justify-center">
          <FormFilling />
        </div>
        <div className="w-full md:w-6/12 flex justify-center items-center">
          <SignForm />
        </div>
    </div>
  )
}

export default Login