import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../utils/redux/appStore";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue } from "../utils/redux/authSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex justify-center items-center">
      <button onClick={() => {dispatch(changeUserTrue()); dispatch(changeProviderFalse()); dispatch(changeAdminFalse()); navigate("/login")}} className="p-4 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-400 cursor-pointer">Book An Appointment</button>
      <button onClick={() => {dispatch(changeProviderTrue()); dispatch(changeUserFalse()); dispatch(changeAdminFalse()); navigate("/login")}} className="p-4 mx-2 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-400 cursor-pointer">Provide A Service</button>
    </div>
  )
}

export default HomePage