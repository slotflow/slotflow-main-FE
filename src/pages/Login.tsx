import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import  Form  from "../compoenents/form/SignForm";
import { RootState } from "../utils/redux/appStore";
import FormFilling from "../compoenents/svgs/formFilling";

const Login = () => {

  const authUser = useSelector((state: RootState) => state.auth?.authUser);

  if (authUser) {
      if (authUser.role === "ADMIN") return <Navigate to="/admin" replace />;
      if (authUser.role === "USER") return <Navigate to="/user" replace />;
      if (authUser.role === "PROVIDER") return <Navigate to="/provider" replace />;
  }

  return (
    <div className='h-[100vh] flex'>
        <div className="md:w-6/12 hidden md:flex items-center justify-center">
          <FormFilling />
        </div>
        <div className="w-full md:w-6/12 flex justify-center items-center">
          <Form />
        </div>
    </div>
  )
}

export default Login