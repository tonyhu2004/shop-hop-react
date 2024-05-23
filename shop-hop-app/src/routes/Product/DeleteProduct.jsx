import ProductRepository from "../../repositories/ProductRepository.js";
import {toast} from "react-toastify";
import {useState} from "react";

function DeleteProduct(prop){
    const productRepository = new ProductRepository();
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(null);

    if (error) {
        throw error;
    }

    function deleteProduct(){
        productRepository.DeleteProduct(prop.id)
            .then((responseData)=>{
                if(responseData){
                    toast.success("Product successfully deleted");
                    prop.closeModal()
                    setErrorMessage("");
                }
            })
            .catch((error) => {
                if(error instanceof TypeError){
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to delete product");
                }
                else{
                    console.error("Delete failed:", error);
                    setErrorMessage("Failed to delete product");
                    setError(error);

                }
            });
    }

    function tryDeleteProduct(){
        deleteProduct();
    }

    return (
        <div className="FormContainer" style={{display: "flex", flexDirection: "column"}}>
            <h2>Are you sure?</h2>

            <p data-cy="error" style={{color: "red", marginTop: 0}}>{errorMessage}</p>
            <div>
                <button onClick={prop.closeModal}>Cancel</button>
                <button data-cy="delete" onClick={tryDeleteProduct}>Delete</button>
            </div>
        </div>
    );
}
export default DeleteProduct