import LoginForm from "@/components/form/LoginForm";
import { FormFilling } from "../../components/svgs/FormFilling";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogin = () => {

  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    console.log("Admin login checking ")
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

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