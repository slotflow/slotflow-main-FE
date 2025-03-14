import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/landing/Header";
import Footer from "../../components/landing/Footer";
import { RootState } from "../../utils/redux/appStore";
import { Bounce, ToastContainer } from "react-toastify";

const LandingLayout = () => {
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

export default LandingLayout