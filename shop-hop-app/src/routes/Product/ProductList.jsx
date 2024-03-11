import ProductRepository from "../../repositories/ProductRepository.js";
import {useEffect, useState} from "react";
import ProductCard from "../../components/ProductCard.jsx";
function ProductList(){
    const productRepository = new ProductRepository();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts(){
            const products = await productRepository.GetProducts();
            setProducts(products);
            console.log(products)
        }
        fetchProducts();
    }, []);

    console.log(products)
    return (
        <div className="ProductCards">
            {products ? (
                products.map((item, index) => (
                    <ProductCard
                    key={index}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    ></ProductCard>
                ))
            ) : (
                <p>loading</p>
            )}
        </div>
    )
}

export default ProductList