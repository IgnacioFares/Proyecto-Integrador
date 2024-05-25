import { Outlet } from "react-router-dom"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"


export const Layout = () => {
  return (
   <>
    <Header/>
    <Outlet/>
    <Footer/>
   </>
  )
}
