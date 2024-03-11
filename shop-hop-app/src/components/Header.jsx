import {Link} from "react-router-dom";

function Header(){
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
                        <Link to={`ProductList`}>Products</Link>
                    </li>
                    <li>
                        <Link to={`ProductDashboard`}>ProductDashboard</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header