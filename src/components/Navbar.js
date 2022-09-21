import React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import '../assets/burgerBtn.css';
import userContext from '../contexts/userContext';
import { Button } from '@mui/material';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';

export default function Navbar() {
    const { user } = useContext(userContext);
    const [isNavOpen, setNavOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const handleClose = () => { setShow(false); return getProfile() };
    const handleShow = () => { setShow(true); return getProfile() };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
            });
    }, []);

    function openNav() {
        const menuBtn = document.querySelector('.menu-btn');
        const navMenu = document.querySelector('.nav-btn-container');

        if (!isNavOpen) {
            menuBtn.classList.add('open');
            navMenu.classList.add('nav-btn-container-open');
            navMenu.classList.remove('nav-btn-container-close');
            setNavOpen(true);
        } else {
            navMenu.classList.add('nav-btn-container-close');
            menuBtn.classList.remove('open');
            navMenu.classList.remove('nav-btn-container-open');
            setNavOpen(false);
        }
    }

    const navigate = useNavigate();

    function search(event) {
        event.preventDefault();
        navigate(`/search/${formData.search}`);
        setFormData({
            search: ""
        });
    }

    const [formData, setFormData] = useState({
        search: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    const [userData, setUserData] = useState({});

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

    return (
        <nav>
            <h1 className='logo'><Link to="/">pcwebbs</Link></h1>
            <form className='search-form search-form-close-out' onSubmit={search}>
                <input className='search-bar' type="text" name="search" value={formData.search} onChange={handleChange} placeholder='Search' />
                <button type="submit" className='btn-search'><SearchIcon className='search-icon' style={{ fontSize: "2em", color: "#FFFFFF" }} /></button>
            </form>
            <div className='nav-btn-container nav-btn-container-close'>
                <form className='search-form search-form-close-in' onSubmit={search}>
                    <input className='search-bar' type="text" name="search" value={formData.search} onChange={handleChange} placeholder='Search' />
                    <button type="submit" className='btn-search2'><SearchIcon className='search-icon' style={{ fontSize: "2em", color: "#FFFFFF" }} /></button>
                </form>
                {
                    user.id != null
                        ?
                        user.isAdmin
                            ?
                            <>
                                <Link to="/logout"><button className='nav-btn mx-2'>Logout</button></Link>
                            </>
                            :
                            <>
                                <Link to="/orders"><button className='nav-btn mx-2'>Orders<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                                </svg></button></Link>
                                <button className='nav-btn mx-2' onClick={handleShow}>Cart<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
                                    <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg></button>
                                <Offcanvas show={show} onHide={handleClose} name="end" placement="end">
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title>Cart<Badge bg="danger">
                                            {
                                                userData.userCart !== undefined
                                                    ?
                                                    userData.userCart.length > 0
                                                        ?
                                                        `${userData.userCart.length}`
                                                        :
                                                        0
                                                    :
                                                    0
                                            }
                                        </Badge></Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body className="canvas-css">
                                        <Link to="/cart"><Button variant="outlined" color="error" onClick={handleClose}>Go To Cart</Button></Link>
                                        {
                                            userData.userCart !== undefined
                                                ?
                                                userData.userCart.length > 0
                                                    ?
                                                    userData.userCart.map((e, i) => {
                                                        let image = "";
                                                        products.forEach(el => el._id === e.productId ? image = el.img : "");
                                                        return (
                                                            <div key={i} className="cart-details d-flex flex-column flex-lg-row justify-content-start align-items-center my-2">
                                                                <img src={image} className="img-fluid w-100" alt={e.cartNumber} />
                                                                <div>
                                                                    <p>Cart Number: {e.cartNumber}</p>
                                                                    <p>Product Name: {e.productName}</p>
                                                                    <p>Product Quantity Added: {e.quantity}</p>
                                                                    <p>Total Price: {e.totalPrice}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <p>Nothing in your cart yet.</p>
                                                :
                                                <></>
                                        }
                                    </Offcanvas.Body>
                                </Offcanvas>

                                <Link to="/account"><button className='nav-btn mx-2'>Account<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg></button></Link>
                                <Link to="/logout"><button className='nav-btn mx-2'>Logout<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                </svg></button></Link>
                            </>
                        :
                        <>
                            <Link to="/login"><button className='nav-btn mx-2'>Login</button></Link>
                            <Link to="/register"><button className='nav-btn mx-2'>Register</button></Link>
                        </>
                }
            </div>
            <div className="menu-btn" onClick={openNav}>
                <div className="menu-btn__burger"></div>
            </div>
        </nav >
    )
}
