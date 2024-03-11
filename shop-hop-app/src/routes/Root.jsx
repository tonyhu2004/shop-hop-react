import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
function Root(){
    return(
        <>
            <Header></Header>
            <Outlet/>
            <Footer></Footer>
        </>
    )
}

export default Root