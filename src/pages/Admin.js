import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import '../styles/adminStyle.css';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [viewProduct, setViewProduct] = useState({
        _id: 0,
        productDescription: "",
        productStocks: "",
        productPrice: 1,
        productCreatedOn: "",
        isArchived: false,
        slug: "",
        category: "",
        img: "",
        productOrders: [],
    });

    const [formProductData, setFormProductData] = useState({
        name: "",
        description: "",
        stocks: "",
        price: "",
        image: "",
        category: "",
    });

    function handleProductChange(event) {
        const { name, value } = event.target;
        setFormProductData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function fetchProducts() {
        fetch(`${process.env.REACT_APP_API_URL}/product/listAll`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => setProducts(data.data));
    }

    function fetchUsers() {
        fetch(`${process.env.REACT_APP_API_URL}/user/getUsers`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => setUsers(data.data));
    }

    useEffect(() => {
        fetchProducts();
        fetchUsers();
    }, []);


    function archiveProduct(id) {
        fetch(`${process.env.REACT_APP_API_URL}/product/archiveProduct`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: id
            })
        })
            .then(response => response.json())
            .then(data => {
                fetchProducts();
                Swal.fire({
                    title: "Success!",
                    icon: "success",
                    text: "Great job."
                })
            });
    }

    function addProduct(event) {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/product/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                productName: formProductData.name,
                productDescription: formProductData.description,
                productStocks: formProductData.stocks,
                productPrice: formProductData.price,
                img: formProductData.image,
                category: formProductData.category,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.response === true) {
                    Swal.fire({
                        title: "Successfully Added the Product!",
                        icon: "success",
                        text: "Product added"
                    })
                    setFormProductData({
                        name: "",
                        description: "",
                        stocks: "",
                        price: "",
                        image: "",
                        category: "",
                    })
                    fetchProducts();
                } else {
                    Swal.fire({
                        title: "Product Not Added!",
                        icon: "error",
                        text: "Please try again"
                    })
                }
            })
    }

    return (
        <>
            <div className='admin my-5'>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    className='modal-admin'
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {viewProduct.productName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={() => { archiveProduct(viewProduct._id); viewProduct.isArchived = !viewProduct.isArchived }} variant="contained" color="error">
                            {
                                viewProduct.isArchived
                                    ?
                                    "Unarchive this product"
                                    :
                                    "Archive this product"
                            }
                        </Button>
                        <h4>Product Image</h4>
                        <p>
                            <img src={viewProduct.img} alt={viewProduct.img} width="150px" />
                        </p>
                        <h4>Product ID</h4>
                        <p>
                            {viewProduct._id}
                        </p>
                        <h4>Product Description</h4>
                        <p>
                            {viewProduct.productDescription}
                        </p>
                        <h4>Product Price</h4>
                        <p>
                            ₱{viewProduct.productPrice}.00
                        </p>
                        <h4>Product Stocks</h4>
                        <p>
                            {viewProduct.productStocks}
                        </p>
                        <h4>Product Category</h4>
                        <p>
                            {viewProduct.category}
                        </p>
                        <h4>Product Slug</h4>
                        <p>
                            {viewProduct.slug}
                        </p>
                        <h4>Product Imported On</h4>
                        <p>
                            {viewProduct.productCreatedOn}
                        </p>
                        <h4>Product Status</h4>
                        <p>
                            {viewProduct.isArchived ? "Inactive" : "Active"}
                        </p>
                        <h4>Product Pending Orders</h4>
                        <div>
                            {
                                viewProduct.productOrders.length === 0
                                    ?
                                    <p>No pending orders for this product.</p>
                                    :
                                    viewProduct.productOrders.map((e, i) => {
                                        return (
                                            <div className="mx-2" key={i}>
                                                <h5>Order {i + 1}</h5>
                                                <div className='mx-5'>
                                                    <p>Id: {e.orderId}</p>
                                                    <p>Billing Name: {e.billingName}</p>
                                                    <p>Billing Address: {e.billingAddress}</p>
                                                    <p>Total Price: {e.totalPrice}</p>
                                                    <p>Quantity: {e.quantity}</p>
                                                    <p>Ordered On: {e.orderCreatedOn}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                        </div>
                    </Modal.Body>
                </Modal>

                <Tab.Container defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">All Products</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Archived Products</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Add Product</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Orders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fifth">All Users</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <h6>Total Products: {products.length}</h6>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>Product Stocks</th>
                                                <th>Product Price</th>
                                                <th>Product Category</th>
                                                <th>Product Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((e, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{e._id}</td>
                                                            <td>{e.productName}</td>
                                                            <td>{e.productStocks}</td>
                                                            <td>{e.productPrice}</td>
                                                            <td>{e.category}</td>
                                                            <td>{e.isArchived ? "Inactive" : "Active"}</td>
                                                            <td>
                                                                <Button onClick={() => { setShow(true); setViewProduct({ ...e }) }} variant="outlined" color="error">View</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h6>Total Active Products: {products.filter(e => !e.isArchived).length}</h6>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Product ID</th>
                                                <th>Product Name</th>
                                                <th>Product Stocks</th>
                                                <th>Product Price</th>
                                                <th>Product Category</th>
                                                <th>Product Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.filter(e => e.isArchived).map((e, i) => {
                                                    return (
                                                        <tr key={i + "filtered"}>
                                                            <td>{e._id}</td>
                                                            <td>{e.productName}</td>
                                                            <td>{e.productStocks}</td>
                                                            <td>{e.productPrice}</td>
                                                            <td>{e.category}</td>
                                                            <td>{e.isArchived ? "Inactive" : "Active"}</td>
                                                            <td>
                                                                <Button onClick={() => { setShow(true); setViewProduct({ ...e }) }} variant="outlined" color="error">View</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Form onSubmit={addProduct}>
                                        <Form.Group className="mb-3" controlId="name">
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Product Name"
                                                name="name"
                                                value={formProductData.name}
                                                onChange={handleProductChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="description">
                                            <Form.Label>Product Description</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Product Description"
                                                name="description"
                                                value={formProductData.description}
                                                onChange={handleProductChange}
                                                required

                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="stocks">
                                            <Form.Label>Product Stocks</Form.Label>
                                            <Form.Control type="number" placeholder="Enter Product Stocks"
                                                value={formProductData.stocks}
                                                name="stocks"
                                                onChange={handleProductChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="price">
                                            <Form.Label>Product Price</Form.Label>
                                            <Form.Control type="number" placeholder="Enter Product Price"
                                                value={formProductData.price}
                                                name="price"
                                                onChange={handleProductChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="image">
                                            <Form.Label>Product Image</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Product Image"
                                                value={formProductData.image}
                                                name="image"
                                                onChange={handleProductChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="category">
                                            <Form.Label>Product Category</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Product Category"
                                                value={formProductData.category}
                                                name="category"
                                                onChange={handleProductChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Button variant="outlined" type="submit" color="error">
                                            Submit
                                        </Button>
                                    </Form>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>User ID</th>
                                                <th>Billing Name</th>
                                                <th>Billing Address</th>
                                                <th>Total Price</th>
                                                <th>Quantity</th>
                                                <th>Ordered On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.filter(e => e.productOrders.length > 0).map(e => {
                                                    return e.productOrders.map((el, i) => {
                                                        return (
                                                            <tr key={el.orderId}>
                                                                <td>{el.orderId}</td>
                                                                <td>{el.userId}</td>
                                                                <td>{el.billingName}</td>
                                                                <td>{el.billingAddress}</td>
                                                                <td>{el.totalPrice}</td>
                                                                <td>{el.quantity}</td>
                                                                <td>{el.orderCreatedOn}</td>
                                                            </tr>
                                                        )
                                                    })
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>User Id</th>
                                                <th>User Name</th>
                                                <th>Email Address</th>
                                                <th>Mobile Number</th>
                                                <th>User Status</th>
                                                <th>User Cart</th>
                                                <th>User Orders</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(e => {
                                                    return (
                                                        <tr key={e._id}>
                                                            <td>{e._id}</td>
                                                            <td>{e.fullName}</td>
                                                            <td>{e.emailAddress}</td>
                                                            <td>{e.mobileNumber}</td>
                                                            <td>{e.isAdmin ? "Admin" : "User"}</td>
                                                            <td>{e.userCart.length}</td>
                                                            <td>{e.userOrders.length}</td>
                                                            <td>{
                                                                e.addresses.length > 0
                                                                    ?
                                                                    `${e.addresses[0].street} ${e.addresses[0].city} ${e.addresses[0].state} ${e.addresses[0].country} ${e.addresses[0].zip}`
                                                                    :
                                                                    "No Address"
                                                            }</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    )
}