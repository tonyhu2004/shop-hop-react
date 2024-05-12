import "./ProductCard.css"
import {Link} from "react-router-dom";
function ProductCard(product){
    return(
        <Link to={`/ProductList/Details/${product.id}`}>
            <div className="Card">
                <div style={{
                    width: "100px", height: "100px",
                    borderRadius: "8px", backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    }}
                />
                <p className="CardName">{product.name}</p>
                <p className="CardPrice">€{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard