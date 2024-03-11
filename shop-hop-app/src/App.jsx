import './App.css'
import ProductList from "./routes/Product/ProductList.jsx";
import ProductDashboard from "./routes/Product/ProductDashBoard.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Root from "./routes/Root.jsx";
import ProductDashBoardContent from "./routes/Product/ProductDashBoardContent.jsx";
import AddProduct from "./routes/Product/AddProduct.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            children: [
                {
                    path: "ProductList",
                    element: <ProductList/>
                },
                {
                    path: "ProductDashboard",
                    element: <ProductDashboard/>,
                    children: [
                        {
                            path: "",
                            element: <ProductDashBoardContent/>
                        },
                        {
                            path: "Add",
                            element: <AddProduct/>
                        },
                        /*
                        {
                            path: "/Edit/:id",
                            element: <ProductDashBoardContent/>
                        },
                        {
                            path: "/Delete/:id",
                            element: <ProductDashBoardContent/>
                        },
                         */
                    ]
                }
            ]
        }
    ])

  return (
    <>
        <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
