import InputField from "../../components/InputField.jsx";
import {useState} from "react";
import ProductRepository from "../../repositories/ProductRepository.js";
import { useNavigate } from "react-router-dom";
import "../../components/Form.css";
import { toast } from 'react-toastify';

function AddProduct() {
    const productRepository = new ProductRepository()
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
    });
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    if (error) {
        throw error;
    }

    const handleChange = (name, value) => {
        setProduct((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function addProduct(){
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('formFile', product.image);

        productRepository.AddProduct(formData)
            .then((responseData) =>{
                if (responseData) {
                    setErrorMessage("");
                    navigate("/ProductDashboard");
                    toast.success("Product added successfully!");
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to add product");
                }
                else{
                    console.error("AddSubmit failed:", error);
                    setErrorMessage("Failed to add product");
                    setError(error);
                }
            });
    }

    const saveImage = (e) => {
        handleChange('image', e.target.files[0]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const emptyField = Object.values(product).some(
            (value) => value === ""
        );
        if (emptyField){
            setErrorMessage("Product is not complete")
            setProduct({
                name: "",
                price: "",
                description: "",
                image: "",
            })
        }
        else{
            addProduct();
        }
    }

    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <InputField label="Name" type="text" value={product.name}
                            onChange={(value) => handleChange('name', value)}/>
                <InputField label="Price" type="price" value={product.price}
                            onChange={(value) => handleChange('price', value)}/>
                <input type="file" accept="image/png, image/jpeg"
                       onChange={saveImage}/>
                <InputField label="Description" type="textarea" value={product.description}
                            onChange={(value) => handleChange('description', value)}/>
                <p style={{color: "red", marginTop: 0}}>{errorMessage}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddProduct