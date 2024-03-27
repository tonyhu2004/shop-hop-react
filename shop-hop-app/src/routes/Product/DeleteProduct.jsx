import ProductRepository from "../../repositories/ProductRepository.js";
import {toast} from "react-toastify";
import {useState} from "react";

function DeleteProduct(prop){
    const productRepository = new ProductRepository();
    const [errorMessage, setErrorMessage] = useState("")

    async function deleteProduct(){
        return await productRepository.DeleteProduct(prop.id)
            .catch(error => {
            console.error("Error deleting product:", error);
        });
    }
    function tryDeleteProduct(){
        deleteProduct()
            .then((responseData)=>{
                if(responseData){
                    toast.success("Product successfully deleted");
                    prop.closeModal()
                    setErrorMessage("");
                }
                else{
                    console.log(responseData)
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to delete product due to network issues");
                }
            })
            .catch((error) => {
                console.error("Delete failed:", error);
                setErrorMessage("Failed to delete product");
            });
    }

    return (
        <div className="FormContainer" style={{display: "flex", flexDirection: "column"}}>
            <h2>Are you sure?</h2>

            <p style={{color: "red", marginTop: 0}}>{errorMessage}</p>
            <div>
                <button onClick={prop.closeModal}>Cancel</button>
                <button onClick={tryDeleteProduct}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteProduct