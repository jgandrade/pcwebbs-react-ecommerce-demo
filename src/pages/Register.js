import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import userContext from '../contexts/userContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const { user } = useContext(userContext);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password1: "",
    password2: ""
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
    setErrors([]);
    if (
      formData.fullName.length > 0 &&
      formData.email.length > 0 &&
      formData.mobileNo.length > 0 &&
      formData.password1.length > 0 &&
      formData.password2.length > 0 &&
      formData.password1 === formData.password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [formData]);

  function registerUser(event) {
    event.preventDefault();
    setErrors([]);
    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        emailAddress: formData.email,
        mobileNumber: formData.mobileNo,
        password: formData.password1
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors !== undefined) {
          data.errors.map(errors => {
            return setErrors(prevErrors => {
              return [...prevErrors, errors]
            })
          })
        } else if (data.message.indexOf("Email") !== -1) {
          return setErrors([{ message: data.message }]);
        }
        else {
          let timerInterval;
          Swal.fire({
            title: "Registration Successful",
            iconHtml: `<img src="https://66.media.tumblr.com/6fedb7b15a4e7a6814c5c8cc2485fa68/tumblr_mnu21dLKE81rfjowdo1_500.gif" alt="Mega man" width="150px">`,
            customClass: {
              icon: 'no-border'
            },
            text: "You will now be redirected to the login page. :>",
            timer: 3000,
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
              setFormData({
                fullName: "",
                email: "",
                mobileNo: "",
                password1: "",
                password2: ""
              });
            }
          })
          setTimeout(() => navigate("/login"), 3000);

        }
      })
  }

  return (
    user.id === null
      ?
      <>
        <div className='my-5'>
          <h3 className='my-5 text-center'>Register</h3>
          <Form className="d-flex flex-column" onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your name with anyone else.
              </Form.Text>
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="mobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="+63<10 digit number> or 0<10 digit number>"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" name="password1"
                value={formData.password1}
                onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter Password" name="password2"
                value={formData.password2}
                onChange={handleChange} required />
            </Form.Group>
            {
              errors.length > 0
                ?
                <div className='text-center'>
                  {errors.map((e, i) => {
                    return <p style={{ color: "red" }} key={`error-${i}`}>{e.message}</p>
                  })}
                </div>
                :
                false
            }
            <div className="text-center">
              <Button variant={isActive ? "success" : "danger"} type="submit" id="submitBtn" className="col-2" disabled={!isActive}>
                Register
              </Button>
            </div>
          </Form>
        </div>
        <div className='text-center'>
          <p>Already a member? <Link to="/login">Login Here</Link></p>
        </div>
      </>
      :
      <Navigate to="/login" />
  )
}
