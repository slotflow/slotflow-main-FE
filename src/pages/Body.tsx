import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../utils/redux/appStore";
import Header from "../components/head&tail/Header";
import Footer from "../components/head&tail/Footer";
import { Bounce, ToastContainer } from "react-toastify";

const Body = () => {
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme={themeMode ? "light" : "dark"}
        transition={Bounce}
      />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body