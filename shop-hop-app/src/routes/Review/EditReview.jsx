import InputField from "../../components/InputField.jsx";
import {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import ReviewRepository from "../../repositories/ReviewRepository.js";
import ProductRepository from "../../repositories/ProductRepository.js";

// eslint-disable-next-line react/prop-types
function AddReview({ id, onClose }) {
    const reviewRepository = new ReviewRepository()
    const [review, setReview] = useState({
        rating: "",
        comment: "",
        productId: "",
    });
    const [errorMessage, setErrorMessage] = useState("")
    const [error, setError] = useState(null);

    useEffect(() => {
        const productRepository = new ProductRepository()
        function GetProductBy(){
            productRepository.GetProductDetailsBy(id)
                .then(review => {
                    setReview(review);
                })
                .catch(error => {
                    console.log(error)
                    console.error("Error fetching product:", error);
                });
        }
        GetProductBy();
    }, [id]);

    if (review.productId === undefined || review.productId === null || review.productId === "" ){
        setReview((prev) => ({
            ...prev, productId: id.toString()
        }));
    }

    if (error) {
        throw error;
    }

    const handleChange = (name, value) => {
        setReview((prev) => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function editReview(){
        reviewRepository.EditReview(review)
            .then((responseData) =>{
                if (responseData) {
                    setErrorMessage("");
                    onClose();
                    toast.success("Review edited successfully!");
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to edit review");

                }
                else{
                    console.error("EditSubmit failed:", error);
                    setErrorMessage("Failed to edit review");
                    setError(error);
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const emptyField = Object.values(review).some(
            (value) => value === ""
        );
        console.log(review)
        if (emptyField){
            setErrorMessage("Review is not complete")
            setReview({
                rating: "",
                comment: "",
                productId: "",
            })
        }
        else{
            editReview();
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <InputField label="Rating" type="price" value={review.rating}
                        onChange={(value) => handleChange('rating', value)}/>
            <InputField label="Comment" type="textarea" value={review.comment}
                        onChange={(value) => handleChange('comment', value)}/>
            <p style={{color: "red", marginTop: 0}}>{errorMessage}</p>
            <button type="submit">Submit</button>
        </form>
    )
}
export default AddReview