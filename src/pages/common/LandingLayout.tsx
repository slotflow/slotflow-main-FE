import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../utils/redux/appStore";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "@/components/Navs/Header";
import Footer from "@/components/Navs/Footer";

const LandingLayout = () => {
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  const location = useLocation();
  const pathNames = ["/user", '/provider', '/admin'];
  const shouldHideFooter = pathNames.some((path) => location.pathname.startsWith(path));
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
      {!shouldHideFooter && <Footer />}
    </>
  )
}

export default LandingLayout