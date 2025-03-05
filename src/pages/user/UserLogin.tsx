import LoginForm from "@/components/form/LoginForm"
import SignUpForm from "@/components/form/SignUpForm"
import FormFilling from "@/components/svgs/FormFilling"
import { RootState } from "@/utils/redux/appStore"
import { useSelector } from "react-redux"

const UserLogin = () => {

  const {signinForm} = useSelector((store: RootState) => store.state);
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
      {signinForm ?
        <LoginForm/>
      :
        <SignUpForm />
      }
      </div>
    </div>
  )
}

export default UserLogin