import { Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

export default function Cart() {
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getProfile() {
    fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(data => setUserData(data.userProfile));
  }

  useEffect(() => {
    getProfile();
  }, []);

  function checkout() {
    if (userData.addresses.length > 0) {
      fetch(`${process.env.REACT_APP_API_URL}/user/checkout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          getProfile();
          if (data.message!==undefined) {
            Swal.fire({
              title: "Add something to your cart before checking out!",
              icon: "error",
              text: "Add to your cart first."
            })
            handleClose();
          } else {
            if (data.success.length > 0) {
              Swal.fire({
                title: "Checkout Successful!",
                icon: "success",
                text: "You can check your orders for more details about your checkout."
              })
              handleClose();
            }
          }
        })

    } else {
      Swal.fire({
        title: "Checkout failed!",
        icon: "error",
        text: "Please add an address before checking out."
      })
    }
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>All Products in the cart will be checked out. You can either remove the product you don't like to checkout or edit it's quantity before checkout.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={checkout}>
            Proceed to Check Out
          </Button>
        </Modal.Footer>
      </Modal>
      <p>Cart:</p>
      {
        userData.userCart !== undefined
          ?
          userData.userCart.length > 0
            ?
            userData.userCart.map((e, i) => {
              return (
                <div key={i}>
                  <p>Cart Number: {e.cartNumber}</p>
                  <p>Product Id: {e.productId}</p>
                  <p>Product Name: {e.productName}</p>
                  <p>Product Quantity Added: {e.quantity}</p>
                  <p>Total Price: {e.totalPrice}</p>
                  <p>Added On: {e.addedOn}</p>
                  <p>-------------------------------------------</p>
                </div>
              )
            })
            :
            <p>Nothing in your orders yet.</p>
          :
          <></>
      }
      <Button variant="contained" color="error" onClick={handleShow}>Checkout</Button>
    </div>
  )
}
