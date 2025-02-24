import { Outlet } from "react-router-dom";
import Footer from "@/compoenents/head&tail/Footer";
import Header from "@/compoenents/head&tail/Header";

const Body = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body