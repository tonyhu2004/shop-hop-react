import {Link} from "react-router-dom";
import PropTypes from "prop-types";
function Header({isAuthenticated, logout}){
    return (
        <header>
            <h1>
                <Link to={`/`}>ShopHop</Link>
            </h1>
            <nav>
                <ul className="navBar">
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`ProductList?page=1`}>Products</Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link to={`ProductDashboard`}>ProductDashboard</Link>
                        </li>
                    )}
                </ul>
                <ul className="navBar">
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to={`/Account/Profile`}>Profile</Link>
                            </li>
                            <li>
                                <button data-cy="logout" style={{padding: 0,  fontSize: "1em", color: "black", backgroundColor: "white", border: 0}} onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to={`/Account/Login`}>Login</Link>
                            </li>
                            <li>
                                <Link to={`/Account/Register`}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default Header