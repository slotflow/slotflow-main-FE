import LoginForm from "@/components/form/LoginForm";
import {FormFilling} from "../../components/svgs/FormFilling";

const AdminLogin = () => {
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <LoginForm title={"Admin Sing In"} admin={true}/>
      </div>
    </div>
  )
}

export default AdminLogin