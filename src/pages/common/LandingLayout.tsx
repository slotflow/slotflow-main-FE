import { useEffect } from "react";
import Header from "@/components/Navs/Header";
import FooterBar from "@/components/Navs/FooterBar";
import { RootState } from "../../utils/redux/appStore";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { UserData } from "@/utils/interface/sliceInterface";
import { setAuthUser } from "@/utils/redux/slices/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LandingLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((store: RootState) => store.state?.lightTheme);
  const location = useLocation();
  const pathNames = ["/user", '/provider', '/admin'];
  const shouldHideFooter = pathNames.some((path) => location.pathname.startsWith(path));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authUserStr = params.get("authUser");
    if (!authUserStr) return;
    if (authUserStr) {
      const rawUser = JSON.parse(decodeURIComponent(authUserStr));
      if (!rawUser || !rawUser.googleId) return;
      const authUser: UserData = {
        uid: rawUser._id,
        username: rawUser.username,
        email: rawUser.email,
        profileImage: rawUser.profileImage,
        isBlocked: rawUser.isBlocked,
        role: rawUser.role as "USER" | "PROVIDER",
        isLoggedIn: true,
        googleId: rawUser.googleId,
      };
      dispatch(setAuthUser(authUser));
      window.history.replaceState({}, document.title, window.location.pathname);
      if (authUser.role === "USER") navigate('/user');
      else if (authUser.role === "PROVIDER") navigate('/provider/dashboard');
    }
  }, []);

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
      {!shouldHideFooter && <Header />}
      <Outlet />
      {!shouldHideFooter && <FooterBar />}
    </>
  )
}

export default LandingLayout