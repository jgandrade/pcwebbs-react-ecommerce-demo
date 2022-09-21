import React from 'react'
import userContext from '../contexts/userContext';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from '@mui/material';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

export default function Profile() {
    const { user } = useContext(userContext);
    const [userData, setUserData] = useState({})
    const [show, setShow] = useState({
        response: false,
        placeholder: "",
        name: "",
        type: ""
    });
    const [show2, setShow2] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    const handleClose2 = () => {
        setShow2(false);
    }

    function handleSubmit2(event) {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/user/address/set`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                street: formData2.street,
                city: formData2.city,
                state: formData2.state,
                zip: formData2.zip,
                country: formData2.country,
            })
        })
            .then(response => response.json())
            .then(data => {
                getProfile();
                fireSwalSuccess("Address");
                setFormData2({
                    city: "",
                    street: "",
                    state: "",
                    zip: "",
                    country: ""
                })
                setShow2(false)
            })
    }

    const handleClose = () => {
        setFormData({
            email: "",
            name: "",
            number: "",
            password: ""
        });
        setShow({
            response: false,
            placeholder: "",
            name: "",
            type: ""
        });
        setIsActive(false);
    };

    const handleShow2 = () => setShow2(true);

    const handleShow = (placeholder, name, type) => setShow({
        response: true,
        placeholder: placeholder,
        name: name,
        type: type
    });

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        number: "",
        password: ""
    });

    const [formData2, setFormData2] = useState({
        city: "",
        street: "",
        state: "",
        zip: "",
        country: ""
    });

    function fireSwalSuccess(placeholder) {
        getProfile();
        return Swal.fire({
            title: "Sucessful!",
            icon: "success",
            text: `You had updated your ${placeholder}.`
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function handleChange2(event) {
        const { name, value } = event.target;
        setFormData2(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (formData.name !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/user/name/set`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    fullName: formData.name
                })
            })
                .then(response => response.json())
                .then(data => {
                    fireSwalSuccess("profile name");
                    setFormData({
                        email: "",
                        name: "",
                        number: "",
                        password: ""
                    })
                    setShow({
                        response: false,
                        placeholder: "",
                        name: "",
                        type: ""
                    })
                })
        }
        if (formData.email !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/user/email/set`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    emailAddress: formData.email
                })
            })
                .then(response => response.json())
                .then(data => {
                    fireSwalSuccess("email address");
                    setFormData({
                        email: "",
                        name: "",
                        number: "",
                        password: ""
                    })
                    setShow({
                        response: false,
                        placeholder: "",
                        name: "",
                        type: ""
                    })
                })
        }
        if (formData.number !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/user/mobilenumber/set`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    mobileNumber: formData.number
                })
            })
                .then(response => response.json())
                .then(data => {

                    fireSwalSuccess("mobile number");
                    setFormData({
                        email: "",
                        name: "",
                        number: "",
                        password: ""
                    })
                    setShow({
                        response: false,
                        placeholder: "",
                        name: "",
                        type: ""
                    })
                })
        }
        if (formData.password !== "") {
            fetch(`${process.env.REACT_APP_API_URL}/user/password/set`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    password: formData.password
                })
            })
                .then(response => response.json())
                .then(data => {

                    fireSwalSuccess("password");
                    setFormData({
                        email: "",
                        name: "",
                        number: "",
                        password: ""
                    })
                    setShow({
                        response: false,
                        placeholder: "",
                        name: "",
                        type: ""
                    })
                })
        }
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

    useEffect(() => {
        if (
            formData2.street.length > 0 &&
            formData2.city.length > 0 &&
            formData2.state.length > 0 &&
            formData2.zip !== "" &&
            formData2.country.length > 0
        ) {
            setIsActive2(true);
        } else {
            setIsActive2(false);
        }


        if (
            formData.email.length > 0 ||
            formData.name.length > 0 ||
            formData.number.length > 0 ||
            formData.password.length > 0
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [formData, formData2]);

    return (
        !user.isAdmin
            ?
            <div className='my-5'>
                <Modal show={show.response} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change {show.placeholder}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="form-text">
                                <Form.Label>{show.placeholder}</Form.Label>
                                <Form.Control
                                    type={show.type}
                                    placeholder={`Enter New ${show.placeholder}!`}
                                    name={show.name}
                                    value={formData[show.name]}
                                    onChange={handleChange}
                                    autoFocus
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="contained" color="error" disabled={!isActive}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit2}>
                            <Form.Group className="mb-3" controlId="form-text">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Street"
                                    name="street"
                                    value={formData2.street}
                                    onChange={handleChange2}
                                    autoFocus
                                    required
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter City"
                                    name="city"
                                    value={formData2.city}
                                    onChange={handleChange2}
                                    autoFocus
                                    required
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter State"
                                    name="state"
                                    value={formData2.state}
                                    onChange={handleChange2}
                                    autoFocus
                                    required
                                />
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Zip"
                                    name="zip"
                                    value={formData2.zip}
                                    onChange={handleChange2}
                                    autoFocus
                                    required
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Country"
                                    name="country"
                                    value={formData2.country}
                                    onChange={handleChange2}
                                    autoFocus
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="contained" color="error" disabled={!isActive2}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="error" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Tabs
                    defaultActiveKey="profile-info"
                    id="uncontrolled-tab"
                    className="mb-3"
                >
                    <Tab eventKey="profile-info" title="Profile Information">
                        <div className='my-3'>
                            <h6>Profile Name</h6>
                            <p>{userData.fullName}</p>
                            <Button variant="outlined" color="error" onClick={() => handleShow("Profile Name", "name", "text")}>Edit</Button>
                        </div>
                        <div className='my-3'>
                            <h6>Email Address</h6>
                            <p>{userData.emailAddress}</p>
                            <Button variant="outlined" color="error" onClick={() => handleShow("Email Address", "email", "email")}>Edit</Button>
                        </div>
                        <div className='my-3'>
                            <h6>Number</h6>
                            <p>{userData.mobileNumber}</p>
                            <Button variant="outlined" color="error" onClick={() => handleShow("Mobile Number", "number", "text")}> Edit</Button>
                        </div>
                        <div className='my-3'>
                            <h6>Password</h6>
                            <p>********</p>
                            <Button variant="outlined" color="error" onClick={() => handleShow("Password", "password", "password")}>Edit</Button>
                        </div>
                    </Tab>
                    <Tab eventKey="address" title="Address">
                        <h6>Current Address</h6>
                        {
                            userData.addresses !== undefined && userData.addresses[0] !== undefined
                                ?
                                <p>{`${userData.addresses[0].street} ${userData.addresses[0].city} ${userData.addresses[0].state}, ${userData.addresses[0].country}, ${userData.addresses[0].zip}`}</p>
                                :
                                <p>No Current Address</p>
                        }
                        <Button variant="outlined" color="error" onClick={() => handleShow2("Address", "address", "text")}>Edit</Button>
                    </Tab>
                </Tabs>
            </div >
            :
            <Navigate to="/" />
    )
}
