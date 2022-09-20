import React from 'react';
import '../styles/productCard.css';
import Swal from 'sweetalert2';

export default function ProductCard(props) {
    function addToCart() {
        console.log("Working");
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token") === null) {
            Swal.fire({
                title: "Login First To Add Cart!",
                icon: "error",
                text: "Please login senpai."
            })
        }
    }

    return (
        <div className="card">
            <img src={props.img} alt={`${props.productName}`}/>
            <div className="travel-name">
                <h6>{props.productName}</h6>
            </div>
            <div className='my-2 d-flex align-items-center justify-content-center'>
                <button className='mx-1 product-buttons' onClick={addToCart}>Buy Now</button>
                <button className='mx-1 product-buttons' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    )
}
