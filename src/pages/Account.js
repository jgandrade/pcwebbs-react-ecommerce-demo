import React from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/accountCardStyle.css';
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../contexts/userContext';

export default function Account() {
    const { user } = useContext(userContext);

    return (
        !user.isAdmin && localStorage.getItem("token") != null
            ?
            <>
                <div className="account-cards d-flex flex-column flex-md-row justify-content-center align-items-center">
                    <Card className="mx-2 text-center" style={{ width: '18rem', minHeight: '300px' }}>
                        <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" fill="#a83b3b" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                            </svg>
                            <Card.Title>Orders</Card.Title>
                            <Card.Text>
                                See all your order details here
                            </Card.Text>
                            <Card.Link as={Link} to="/orders">Proceed to Orders</Card.Link>
                        </Card.Body>
                    </Card>

                    <Card className="mx-2 text-center" style={{ width: '18rem', minHeight: '300px' }}>
                        <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" fill="#a83b3b" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <Card.Title>Cart</Card.Title>
                            <Card.Text>
                                Get your cart details in here. Proceed to Checkout so that you can have your amazing item.
                            </Card.Text>
                            <Card.Link as={Link} to="/cart">Proceed to Cart</Card.Link>
                        </Card.Body>
                    </Card>

                    <Card className="mx-2 text-center" style={{ width: '18rem', minHeight: '300px' }}>
                        <Card.Body className="d-flex flex-column justify-content-around align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" fill="#a83b3b" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <Card.Title>Profile</Card.Title>
                            <Card.Text>
                                Edit your information here. You can also add your address here
                            </Card.Text>
                            <Card.Link as={Link} to="/profile">Proceed to Profile</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </>
            :
            <Navigate to="/" />
    )
}
