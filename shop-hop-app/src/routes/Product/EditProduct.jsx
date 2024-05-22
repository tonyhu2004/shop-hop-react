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
        description: "",
        image: "",
    });
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    if (error) {
        throw error;
    }

    useEffect(() => {
        const productRepository = new ProductRepository()
        function GetProductBy(){
            productRepository.GetProductBy(id)
                .then(product => {
                    setProduct(product);
                })
                .catch(error => {
                    setError(error);
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

    function editProduct(){
        const productRepository = new ProductRepository();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('formFile', product.image);

        productRepository.EditProduct(formData, id)
            .then((responseData) =>{
                if (responseData) {
                    setErrorMessage("");
                    navigate("/ProductDashboard");
                    toast.success("Product edited successfully!");
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to edit product");
                }
                else{
                    console.error("EditSubmit failed:", error);
                    setErrorMessage("Failed to edit product");
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
            editProduct();
        }
    }
    return (
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <InputField label="Name" cy="name"  type="text" value={product.name}
                            onChange={(value) => handleChange('name', value)}/>
                <InputField label="Price" cy="price" type="price" value={product.price}
                            onChange={(value) => handleChange('price', value)}/>
                <input type="file" data-cy="image" accept="image/png, image/jpeg"
                       onChange={saveImage}/>
                <InputField label="Description" cy="description" type="textarea" value={product.description}
                            onChange={(value) => handleChange('description', value)}/>
                <p data-cy="error" style={{color: "red", marginTop: 0}}>{errorMessage}</p>
                <button data-cy="submit" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditProduct