import "./ProductCard.css"
function ProductCard(product){
    return(
        <div className="Card">
            <p>Title: {product.name}</p>
            <p>Price: €{product.price}</p>
        </div>
    )
}

export default ProductCard