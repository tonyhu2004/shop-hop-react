import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard.jsx";
import "./ProductList.css";
import ProductRepository from "../../repositories/ProductRepository.js";

function ProductListContent() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState("");
    const [buttonPress, setButtonPress] = useState(false);
    const productsInPage = 4;

    useEffect(() => {
        const initialSearchParams = new URLSearchParams(location.search);
        if (!initialSearchParams.has('page')) {
            initialSearchParams.set('page', '1');
            const initialSearchString = initialSearchParams.toString();
            window.history.replaceState({}, '', `${location.pathname}?${initialSearchString}`);
        } else {
            setPage(parseInt(initialSearchParams.get('page'), 10));
        }
    }, [location.pathname, location.search]);

    useEffect(() => {
        const productRepository = new ProductRepository();
        const initialSearchParams = new URLSearchParams(location.search);
        async function fetchProducts() {
            if (page === parseInt(initialSearchParams.get('page'), 10) || buttonPress){
                await productRepository.GetPageProducts(page, productsInPage)
                    .then(products => {
                        setProducts(products.products.map((p) => {
                            if (p.imageUrl === undefined ||p.imageUrl === null || p.imageUrl === "") {
                                return {
                                    ...p,
                                    imageUrl: `https://res.cloudinary.com/dxkq4oonm/image/upload/${p.name + p.id}.jpg`
                                };
                            }
                            return p;
                        }))
                        setPageCount(products.productCount / productsInPage);
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error("Error fetching products:", error);
                    });
            }
        }
        fetchProducts();
    }, [buttonPress, location.search, page]);

    useEffect(() => {
        if (buttonPress){
            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.set('page', page.toString());
            window.history.replaceState({}, '', `${location.pathname}?${newSearchParams.toString()}`);
            setButtonPress(false)
        }
    }, [buttonPress, page, location.search, location.pathname]);


    const increasePage = ()=> {
        if (page < pageCount){
            setPage(prevPage => prevPage + 1);
            setButtonPress(true);
        }
    }

    const decreasePage = ()=> {
        if (page > 1){
            setPage(prevPage => prevPage - 1);
            setButtonPress(true);
        }
    }

    return (
        <div className="ProductCards">
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ProductCard
                        key={index}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                        imageUrl={item.imageUrl}
                    />
                ))
            ) : (
                <p>loading...</p>
            )}
            <ul className="PaginationBar">
                <li>
                    {page > 1 ? <button onClick={decreasePage}>&lt;</button>
                        : <button className="transparentButton">&lt;</button>}
                </li>
                <li>
                    <p>{page}</p>
                </li>
                    <li>
                        {page < pageCount ? <button onClick={increasePage}>&gt;</button>
                            : <button className="transparentButton">&gt;</button>}
                    </li>
            </ul>
        </div>
);
}

export default ProductListContent;