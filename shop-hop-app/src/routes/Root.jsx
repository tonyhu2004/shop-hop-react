import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
function Root({isAuthenticated, logout}){
    return(
        <>
            <Header isAuthenticated={isAuthenticated} logout={logout}></Header>
            <Outlet/>
            <Footer></Footer>
        </>
    )
}

Root.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};
export default Root