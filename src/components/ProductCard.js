import React from 'react';
import '../styles/productCard.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function ProductCard(props) {

    function addToCart() {
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
                    productId: props._id,
                    quantity: 1
                })
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        title: "Successfully added to Cart!",
                        icon: "success",
                        text: "If the same product id exists in your cart, your cart quantity will only update."
                    })
                });
        }
    }


    return (
        <div className="card" data-aos="zoom-in" data-aos-delay={props.load * 50}>
            <Link to={`/product/${props.slug}`}><img src={props.img} alt={`${props.productName}`} /></Link>
            <div className="travel-name">
                <h6 >{props.productName}</h6>
            </div>
            <div className='my-2 d-flex align-items-center justify-content-center'>
                <button className='mx-1 product-buttons' onClick={addToCart}>Buy Now</button>
                <button className='mx-1 product-buttons' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    )
}
