import { useSelector } from "react-redux";
import Header from "../../components/navs/Header";
import Footer from "../../components/navs/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../utils/redux/appStore";
import { Bounce, ToastContainer } from "react-toastify";

const Body = () => {
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');
  const isProviderRoute = location.pathname.startsWith('/provider');
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
      {!isAdminRoute || !isUserRoute || !isProviderRoute && <Footer />}
    </>
  )
}

export default Body