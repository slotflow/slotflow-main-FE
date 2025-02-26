import { useDispatch } from "react-redux"
import { AppDispatch } from "../utils/redux/appStore"
import { changeToServiceProvider, changeToUser } from "../utils/redux/authSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex justify-center items-center">
      <button onClick={() => {dispatch(changeToUser()); navigate("/login")}} className="p-4 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-400 cursor-pointer">Book An Appointment</button>
      <button onClick={() => {dispatch(changeToServiceProvider()); navigate("/login")}} className="p-4 mx-2 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-400 cursor-pointer">Book An Appointment</button>
    </div>
  )
}

export default HomePage