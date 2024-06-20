
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./ProductDashBoardContent.css";
import ProductRepository from "../../repositories/ProductRepository.js";
import DeleteProduct from "./DeleteProduct.jsx";
import Modal from "react-modal";

function ProductDashBoardContent() {
    const [products, setProducts] = useState(null);
    const [id, setId] = useState(0);
    const [closeCount, setCloseCount] = useState(0);
    const [error, setError] = useState(null);

    if (error) {
        throw error;
    }

    useEffect(() => {
        const productRepository = new ProductRepository();
        function fetchProducts(){
            productRepository.GetProducts()
                .then((products)=>{
                    const updatedProducts = products.map((p) => {
                        if (p.imageUrl === undefined ||p.imageUrl === null || p.imageUrl === "") {
                            return {
                                ...p,
                                imageUrl: `https://res.cloudinary.com/dxkq4oonm/image/upload/${p.name + p.id}.jpg`
                            };
                        }
                        return p;
                    });

                    setProducts(updatedProducts)
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    setError(error);
                });
        }
            fetchProducts()
    }, [closeCount]);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(id) {
        setId(id);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setCloseCount((prev) => prev + 1);
    }

    if (!products) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Product Modal"
                appElement={document.getElementById('root')}
                style={{
                    content: {
                        width: 'auto',
                        height: 'auto',
                        top: '50%',
                        left: '50%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: '#fff',
                    },
                }}
            >
                <DeleteProduct closeModal={closeModal} id = {id}/>
            </Modal>
            <table>
                <thead>
                <tr>
                    <th>
                        Title
                    </th>
                    <th>
                        Image
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        <Link to={`Add`}>Create New</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td data-cy="name">{product.name}</td>
                            <td>
                            <img
                                style={{
                                    maxWidth: "100px", width: "100%",
                                    borderRadius: "8px",
                                }}
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            </td>
                            <td>€{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`Edit/${product.id}`}>Edit</Link>
                                <br/>
                                <button data-cy="openDelete" onClick={()=>{openModal(product.id)}} className="deleteButton">Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}

export default ProductDashBoardContent;
