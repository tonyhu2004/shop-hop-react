import InputField from "../../components/InputField.jsx";
import {useEffect, useState} from "react";
import ProductRepository from "../../repositories/ProductRepository.js";
import {useNavigate, useParams} from "react-router-dom";
import "../../components/Form.css";
import {toast} from "react-toastify";
function EditProduct() {
    const{id} = useParams();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        const productRepository = new ProductRepository()
        async function GetProductBy(){
            await productRepository.GetProductBy(id)
                .then(product => {
                    setProduct(product);
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                });
        }
        GetProductBy();
    }, [id]);
    const handleChange = (name, value) => {
        setProduct((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }
    async function editProduct(){
        const productRepository = new ProductRepository()
        return await productRepository.EditProduct(product)
            .catch(error => {
                console.error("Error editing product:", error);
            });
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
                description: ""
            })
        }
        else{
            editProduct()
                .then((responseData) =>{
                    if (responseData) {
                        console.log(responseData)
                        setErrorMessage("");
                        navigate("/ProductDashboard");
                        toast.success("Product edited successfully!");
                    } else {
                        console.error("Offline error occurred");
                        setErrorMessage("Failed to edit product due to network issues");
                    }
                })
                .catch((error) => {
                    console.error("EditSubmit failed:", error);
                    setErrorMessage("Failed to edit product");
                });
        }
    }
    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <InputField label="Name" type="text" value={product.name}
                            onChange={(value) => handleChange('name', value)}/>
                <InputField label="Price" type="price" value={product.price}
                            onChange={(value) => handleChange('price', value)}/>
                <InputField label="Description" type="textarea" value={product.description}
                            onChange={(value) => handleChange('description', value)}/>
                <p style={{color: "red", marginTop: 0}}>{errorMessage}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default EditProduct