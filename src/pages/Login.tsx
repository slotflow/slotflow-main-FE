import { Form } from "@/compoenents/form/Form"
import LoginFormSvg from "@/compoenents/svgs/LoginFormSvg"

const Login = () => {
  return (
    <div className='h-[100vh] flex'>
        <div className="md:w-6/12 hidden md:flex items-center justify-center">
          <LoginFormSvg />
        </div>
        <div className="w-full md:w-6/12 flex justify-center items-center">
          <Form />  
        </div>
    </div>
  )
}

export default Login