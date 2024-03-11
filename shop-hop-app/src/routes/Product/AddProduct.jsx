import InputField from "../../components/InputField.jsx";
import {useState} from "react";
import ProductRepository from "../../repositories/ProductRepository.js";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const productRepository = new ProductRepository()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });
    //const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const handleChange = (name, value) => {
        setProduct((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    async function addProduct(){
        await productRepository.AddProduct(product);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        addProduct()
        .then(()=>{
                navigate("/ProductDashboard")
        })
    }

// <p style={{color: "red"}}>{errorMessage}</p>

    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <InputField label="Name" type="text" value={product.name}
                            onChange={(value) => handleChange('name', value)}/>
                <InputField label="Price" type="price" value={product.price}
                            onChange={(value) => handleChange('price', value)}/>
                <InputField label="Description" type="textarea" value={product.description}
                            onChange={(value) => handleChange('description', value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct