import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import userContext from '../contexts/userContext';
import Swal from "sweetalert2";
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formData]);

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUser({
          id: data.userProfile._id,
          isAdmin: data.userProfile.isAdmin
        })
      })
  }

  function loginUser(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emailAddress: formData.email,
        password: formData.password
      })
    })
      .then(response => response.json())
      .then(data => {
        let timerInterval;
        if (data.accessToken !== undefined) {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
          Swal.fire({
            title: "Login Successful",
            iconHtml: `<img src="https://66.media.tumblr.com/6fedb7b15a4e7a6814c5c8cc2485fa68/tumblr_mnu21dLKE81rfjowdo1_500.gif" alt="Mega man" width="150px">`,
            customClass: {
              icon: 'no-border'
            },
            text: "Enjoy buying tons of Computer Products :>",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          })
        } else {
          Swal.fire({
            title: "Authentication failed!",
            icon: "error",
            text: "Check your login details and try again."
          })
        }
      })
      .catch(err => console.log(err));
    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    user.id !== null
      ?
      <Navigate to="/" />
      :
      <>
        <h3 className='my-5 text-center'>Login</h3>
        <Form className="d-flex flex-column container" onSubmit={loginUser}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name="password"
              value={formData.password}
              onChange={handleChange} required />
          </Form.Group>
          <div className='text-center'>
            <Button variant={isActive ? "success" : "danger"} type="submit" id="submitBtn" className="col-6 col-lg-2" disabled={!isActive}>
              Login
            </Button>
          </div>
        </Form>
      </>
  )
}
