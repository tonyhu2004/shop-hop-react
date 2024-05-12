import InputField from "../../components/InputField.jsx";
import {useState} from "react";
import { toast } from 'react-toastify';
import ReviewRepository from "../../repositories/ReviewRepository.js";

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

    function addReview(){
        reviewRepository.AddReview(review)
            .then((responseData) =>{
                if (responseData) {
                    setErrorMessage("");
                    onClose();
                    toast.success("Review posted successfully!");
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    console.error("Offline error occurred");
                    setErrorMessage("Failed to add review");

                }
                else{
                    console.error("AddSubmit failed:", error);
                    setErrorMessage("Failed to add review");
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
            addReview();
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