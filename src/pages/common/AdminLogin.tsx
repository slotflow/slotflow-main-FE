import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import LoginForm from "@/components/form/CommonForms/LoginForm";
import { FormFilling } from "../../components/svgs/FormFilling";
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';

const AdminLogin = () => {

  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const formFilling = useRef(null);
  
  useEffect(() => {
    if(authUser && authUser.isLoggedIn){
      if(authUser.role === "ADMIN"){
        navigate("/admin");
      } else if(authUser.role === "USER"){
        navigate('/user');
      }else if(authUser.role === "PROVIDER"){
        navigate('/provider')
      }
    }
  }, [authUser, navigate]);

  useEffect(() => {
    gsap.to(formFilling.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center md:p-20">
        <FormFilling ref={formFilling}/>
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <LoginForm isAdmin={true} role={"ADMIN"} title={"Admin Sign In"}/>
      </div>
    </div>
  )
}

export default AdminLogin