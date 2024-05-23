import ProductRepository from "../../repositories/ProductRepository.js";
import {useEffect, useState} from "react";
import star from "../../assets/star.png";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./ProductDetails.css";
import AddReview from "../Review/AddReview.jsx";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "./ProductDetails.css";

function ProductDetails({isAuthenticated}) {
    const navigate = useNavigate()
    const{id} = useParams();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        reviews: [],
    })
    const [error, setError] = useState(null);
    const [isAddReviewModalOpen, setAddReviewModalOpen] = useState(false);
    const [isEditReviewModalOpen, setEditReviewModalOpen] = useState(false);
    const [reviewsChange, setReviewsChange] = useState([]);
    useEffect(() => {
        const productRepository = new ProductRepository()
        function GetProductBy(){
            productRepository.GetProductDetailsBy(id)
                .then(product => {

                    if (product.imageUrl === undefined ||product.imageUrl === null || product.imageUrl === "") {
                        product.imageUrl = `https://res.cloudinary.com/dxkq4oonm/image/upload/${product.name + product.id}.jpg`;
                    }

                    setProduct(product);

                })
                .catch(error => {
                    console.log(error)
                    console.error("Error fetching product:", error);
                });
        }
        GetProductBy();
    }, [id, reviewsChange]);

    useEffect(() => {
        const addReviewButton = document.getElementById("add-review-button");

        if (product.reviews.some(r => r.userId === product.currentUserId)){
            addReviewButton.disabled = true;
            addReviewButton.style.background='gray';
            addReviewButton.style.color='lightgray';
        }
        else{
            addReviewButton.disabled = false;
        }

        const elementsWithPrefix = document.querySelectorAll('[id^="edit-review-button"]');
        const currentUserId = product.currentUserId;

        console.log(elementsWithPrefix)
        elementsWithPrefix.forEach(element => {
            const idParts = element.id.split('-');
            const reviewUserId = idParts.slice(3).join('-');
            const editReviewButton = document.getElementById(`edit-review-button-${reviewUserId}`);

            if (reviewUserId === currentUserId) {
                editReviewButton.removeAttribute('hidden');
            } else {
                editReviewButton.setAttribute('hidden', 'hidden');
            }
        });
    }, [product]);

    return (
        <div>
            {product ? (
                <>
                    <div className="product-details">
                        <div className="details-header">
                            <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <h1 style={{margin: '0'}}>{product.name}</h1>
                                {
                                    product.userId === product.currentUserId
                                        ? (<p>{product.username}</p>)
                                        : (<Link to={`/Chat/${product.userId}/${product.currentUserId}`}>{product.username}</Link>)
                                }
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img src={star} alt="" width="20"/>
                                <h5 style={{margin: 0, maxWidth: '50px', marginLeft: '8px'}}>5</h5>
                            </div>
                        </div>
                        <div className="details-content">
                            <div style={{width: '50%', margin: '19px'}}>
                                <div className="main-align-layer">
                                    <div className="second-align-layer">
                                        <img className="details-image"
                                             src={product.imageUrl}
                                             alt={product.name}
                                        />
                                        <h2>Product description</h2>
                                        <p style={{textAlign: 'left'}}>{product.description}</p> {/* Align text to the right */}

                                        <div className="review-header">
                                            <h2>Reviews</h2>
                                            <button id="add-review-button" onClick={handleAddReview} style={{fontSize: "1em"}}>Post Review</button>
                                        </div>
                                        {
                                            product.reviews.map(review => (
                                                <div key={review.id} style={{
                                                    border: '1px solid rgb(173, 173, 173)',
                                                    padding: '15px',
                                                    borderRadius: '15px',
                                                    marginBottom: '0.5em',
                                                }}>
                                                    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent:'space-between'}}>
                                                        <div style={{display: "flex", alignItems: 'center', flexDirection: 'row'}}>
                                                            <img src={star} alt="" width="20"/>
                                                            <h5 style={{
                                                                margin: 0,
                                                                maxWidth: '50px',
                                                                marginLeft: '8px'
                                                            }}>{review.rating}</h5>
                                                        </div>
                                                        <div>
                                                            {review && (
                                                                <button id={`edit-review-button-${review.userId}`}
                                                                        hidden
                                                                        onClick={handleAddReview}
                                                                        style={{fontSize: "0.9em", width: "3.5em"}}>Edit
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p>{review.username}</p>
                                                    <p>{review.comment}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '50%', margin: '19px'}}>
                                <p style={{margin: 'auto', fontSize: '2em', color: 'red'}}>{product.price}</p>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={isAddReviewModalOpen}
                        onRequestClose={closeAddReviewModal}
                        contentLabel="Add Review Modal"
                        appElement={document.getElementById('root')}
                        className="review-modal"
                    >
                        <AddReview
                            id={id}
                            onClose={closeAddReviewModal}
                        />
                    </Modal>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

    function handleAddReview(){
        if (isAuthenticated){
            openAddReviewModal();
        }
        else{
            navigate("/Account/Login");
        }
    }

    function openAddReviewModal(){
        setAddReviewModalOpen(true);
    }
    function closeAddReviewModal(){
        setAddReviewModalOpen(false);
        setReviewsChange(reviews => [...reviews, 1]);
    }
    function openEditReviewModal(){
        setEditReviewModalOpen(true);
    }
    function closeEditReviewModal(){
        setEditReviewModalOpen(false);
        setReviewsChange(reviews => [...reviews, 1]);
    }
}

ProductDetails.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default ProductDetails;