import './App.css'
import ProductList from "./routes/Product/ProductList.jsx";
import ProductDashboard from "./routes/Product/ProductDashBoard.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from "./routes/Root.jsx";
import ProductDashBoardContent from "./routes/Product/ProductDashBoardContent.jsx";
import AddProduct from "./routes/Product/AddProduct.jsx";
import EditProduct from "./routes/Product/EditProduct.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <ToastContainer stacked/>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />} >
                        <Route path="/ProductList" element={<ProductList />} />
                        <Route path="/ProductDashboard" element={<ProductDashboard />}>
                            <Route path="" element={<ProductDashBoardContent />} />
                            <Route path="Add" element={<AddProduct />} />
                            <Route path="Edit/:id" element={<EditProduct />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App
