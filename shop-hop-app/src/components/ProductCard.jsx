import "./ProductCard.css"
function ProductCard(product){
    return(
        <div className="Card">
            <p className="CardName">{product.name}</p>
            <p className="CardPrice">€{product.price}</p>
        </div>
    )
}

export default ProductCard