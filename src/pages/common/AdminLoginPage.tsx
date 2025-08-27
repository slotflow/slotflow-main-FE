import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import LeftSideBox from '@/components/common/LeftSideBox';
import LoginForm from "@/components/form/CommonForms/LoginForm";
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';
import { FormSvgs } from '@/components/svgs/FormSvgs';

const AdminLoginPage = () => {

  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const formFilling = useRef(null);
  
  // useEffect(() => {
  //   if(authUser && authUser.isLoggedIn){
  //     if(authUser.role === "ADMIN"){
  //       navigate("/admin");
  //     } else if(authUser.role === "USER"){
  //       navigate('/user');
  //     }else if(authUser.role === "PROVIDER"){
  //       navigate('/provider')
  //     }
  //   }
  // }, [authUser, navigate]);

  useEffect(() => {
    if(authUser && authUser.isLoggedIn){
      if(authUser.role === "ADMIN"){
        navigate("/admin/dashboard");
      } else if(authUser.role === "USER"){
        navigate('/user/dashboard');
      }else if(authUser.role === "PROVIDER"){
        navigate('/provider/dashboard')
      }
    }
  }, [authUser, navigate]);

  useEffect(() => {
    gsap.to(formFilling.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
      <LeftSideBox svg={<FormSvgs />} animateSvg />
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <LoginForm isAdmin={true} role={"ADMIN"} title={"Admin Sign In"}/>
      </div>
    </div>
  )
}

export default AdminLoginPage