
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./ProductDashBoardContent.css";
import ProductRepository from "../../repositories/ProductRepository.js";
function ProductDashBoardContent() {
    const [products, setProducts] = useState(null);

    const productRepository = new ProductRepository();

    useEffect(() => {
        async function fetchProducts(){
            const product = await productRepository.GetProducts();
            setProducts(product)
        }
        fetchProducts()
    }, []);

    if (!products) {
        return <p>Loading...</p>;
    }
    return (
        <table>
            <thead>
            <tr>
                <th>
                    Title
                </th>
                <th>
                    Price
                </th>
                <th>
                    Description
                </th>
                <th>
                    <Link to={`Add`}>Create New</Link>
                </th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td>
                            <Link to={`Edit/${product.id}`}>Edit</Link>
                            <br/>
                            <Link to={`Delete/${product.id}`}>Delete</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
}
export default ProductDashBoardContent;
