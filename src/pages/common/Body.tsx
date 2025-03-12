import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/navs/Header";
import Footer from "../../components/navs/Footer";
import { RootState } from "../../utils/redux/appStore";
import { Bounce, ToastContainer } from "react-toastify";

const Body = () => {
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
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
      {!isAdminRoute && <Header />}
      <Outlet />
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default Body