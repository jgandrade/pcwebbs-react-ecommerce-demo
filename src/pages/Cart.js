import { Button } from '@mui/material';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import userContext from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

export default function Cart() {
  const { user } = useContext(userContext);
  const [userData, setUserData] = useState({});
  const [chosenCart, setChosenCart] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => { setShow2(false); return setQuantity("") };
  const handleShow2 = (cartNumber) => { setShow2(true); return setChosenCart(cartNumber) };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
      });
  }, []);


  function handleChange2(event) {
    const { value } = event.target;
    setQuantity(value);
  }

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
          
          if (data.message !== undefined) {
            Swal.fire({
              title: "Add something to your cart before checking out!",
              icon: "error",
              text: "Add to your cart first."
            })
            handleClose();
          } else {
            if (data.errors.length > 0) {
              Swal.fire({
                title: "Some of the items on your cart checked out Unsuccessfully!",
                icon: "error",
                text: "You can check your cart quantity it might be bigger than the current stock of the product."
              })
              getProfile();
              handleClose();
            } else {
              Swal.fire({
                title: "Checkout Successful!",
                icon: "success",
                text: "You can check your orders for more details about your checkout."
              })
              getProfile();
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

  function editQuantity(cartNumber) {
    fetch(`${process.env.REACT_APP_API_URL}/user/cart/updateQuantity`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartNumber: cartNumber,
        quantity: parseInt(quantity)
      })
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          title: "Successfully Changed Quantity!",
          icon: "success",
          text: "Nice now let's check it out."
        })
        getProfile();
      });
  }

  function removeFromCart(cartNumber) {
    fetch(`${process.env.REACT_APP_API_URL}/user/cart/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cartNumber: cartNumber
      })
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          title: "Successfully Removed From Cart!",
          icon: "success",
          text: "Lets order for some more."
        })
        getProfile();
      });
  }

  return (
    !user.isAdmin && localStorage.getItem("token") != null
      ?
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

        <Modal show={show2} onHide={handleClose2}>
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
                  onChange={handleChange2}
                  autoFocus
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" onClick={() => editQuantity(chosenCart)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <p>Cart:</p>
        <Button variant="contained" color="error" onClick={handleShow}>Checkout</Button>
        {
          userData.userCart !== undefined
            ?
            userData.userCart.length > 0
              ?
              userData.userCart.map((e, i) => {
                let image = "";
                products.forEach(el => el._id === e.productId ? image = el.img : "");
                return (
                  <div key={i} className="d-flex flex-column flex-lg-row justify-content-start align-items-center my-5 cart-details-page">
                    <img src={image} className="w-25" style={{ minWidth: "200px", maxWidth: "400px" }} alt={e.cartNumber} />
                    <div>
                      <p>Cart Number: {e.cartNumber}</p>
                      <p>Product Name: {e.productName}</p>
                      <p>Product Quantity Added: {e.quantity}</p>
                      <p>Total Price: ₱{e.totalPrice}</p>
                      <p>Added On: {e.addedOn}</p>
                      <Button variant="outlined" color="error" onClick={() => handleShow2(e.cartNumber)}>Edit Quantity</Button>
                      <Button variant="outlined" color="error" onClick={() => removeFromCart(e.cartNumber)}>Remove From Cart</Button>
                    </div>
                  </div>
                )
              })
              :
              <p>Nothing in your cart yet.</p>
            :
            <></>
        }
      </div>
      :
      <Navigate to="/" />
  )
}
