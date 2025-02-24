import Footer from "@/compoenents/head&tail/Footer"
import Header from "@/compoenents/head&tail/Header"
import { Outlet } from "react-router-dom"

const Body = () => {
  return (
    <>
    <Header/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Body