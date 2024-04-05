import './App.css'
import ProductList from "./routes/Product/ProductList.jsx";
import ProductDashboard from "./routes/Product/ProductDashBoard.jsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Root from "./routes/Root.jsx";
import ProductDashBoardContent from "./routes/Product/ProductDashBoardContent.jsx";
import AddProduct from "./routes/Product/AddProduct.jsx";
import EditProduct from "./routes/Product/EditProduct.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import AccountRepository from "./repositories/AccountRepository.js";
import Account from "./routes/Account/Account.jsx";
import Profile from "./routes/Account/Profile.jsx";
import Login from "./routes/Account/Login.jsx";
import Register from "./routes/Account/Register.jsx";
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const accountRepository = new AccountRepository;
        async function checkAuthentication(){
            return await accountRepository.IsUserAuthenticated();
        }
        async function refreshTokens(){
            return await accountRepository.Refresh();
        }
        checkAuthentication()
            .then((auth)=>{
                setIsAuthenticated(auth);

                const refreshToken = localStorage.getItem('refreshToken');

                if (!isAuthenticated && !auth && !(refreshToken === undefined || refreshToken == null || refreshToken.length <= 0)){
                    refreshTokens()
                        .then((responseData)=>{
                            localStorage.setItem('accessToken', responseData.accessToken);
                            localStorage.setItem('refreshToken', responseData.refreshToken);
                        })
                        .catch(console.error)
                }
            })
            .catch(console.error)
    }, [isAuthenticated]);

    function logout(){
        localStorage.clear();
        setIsAuthenticated(false);
    }

    return (
        <>
            <ToastContainer stacked/>
            <Router>
                <Routes>
                    <Route path="/" element={<Root isAuthenticated = {isAuthenticated} logout = {logout}/>} >
                        <Route path="/ProductList" element={<ProductList />} />
                        <Route path="/ProductDashboard" element={isAuthenticated ? <ProductDashboard/>  : <Navigate to="/"/>}>
                            <Route path="" element={<ProductDashBoardContent />} />
                            <Route path="Add" element={<AddProduct />} />
                            <Route path="Edit/:id" element={<EditProduct />} />
                        </Route>
                        <Route path="/Account" element={<Account/>}>
                            <Route path="Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/"/>} />
                            <Route path="Login" element={<Login setIsAuthenticated = {setIsAuthenticated}/>} />
                            <Route path="Register" element={<Register />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App
