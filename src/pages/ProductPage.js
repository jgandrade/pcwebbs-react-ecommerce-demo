import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

export default function ProductPage() {
    const { product } = useParams();
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [chosenProduct, setChosenProduct] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (productId) => { setShow(true); return setChosenProduct(productId) };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
            });
    }, []);

    function handleChange(event) {
        const { value } = event.target;
        setQuantity(value);
    }

    function addToCart() {
        handleClose();
        if (localStorage.getItem("token") === null) {
            Swal.fire({
                title: "Login First To Add Cart!",
                icon: "error",
                text: "Please login senpai."
            })
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/user/addToCart`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: chosenProduct,
                    quantity: parseInt(quantity)
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.response === true) {

                        Swal.fire({
                            title: "Successfully added to Cart!",
                            icon: "success",
                            text: "If the same product id exists in your cart, your cart quantity will only update."
                        })
                    } else {
                        Swal.fire({
                            title: "Error adding to cart!",
                            icon: "error",
                            text: "The quantity you entered exceeded the product stocks."
                        })
                    }
                });
        }
        setQuantity("");
    }

    return (
        <div className='my-5 mx-5 d-flex flex-column justify-content-center align-items-center'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Quantity To Add Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter desired quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addToCart}>
                        Add To Cart
                    </Button>
                </Modal.Footer>
            </Modal>
            {
                products.map(e => {
                    if (e.slug === product) {
                        return (
                            <div key={e} className="d-flex justify-content-start align-items-center flex-md-row flex-column product-page-details">
                                <img src={e.img} alt={e.slug} className="img-fluid w-100" style={{ minWidth: "250px", maxWidth: "500px" }} />
                                <div>
                                    <h5>{e.productName}</h5>
                                    <p>{e.productDescription}</p>
                                    <h6>Price:</h6>
                                    <p>&#8369;{e.productPrice}</p>
                                    <h6>Stocks:</h6>
                                    <p>{e.productStocks}</p>
                                    <h6>Category:</h6>
                                    <p>{e.category}</p>
                                    <Button variant="contained" color="error" onClick={() => handleShow(e._id)}>Add To Cart</Button>
                                </div>
                            </div>
                        )
                    }
                    return false;
                })
            }
        </div>
    )
}
