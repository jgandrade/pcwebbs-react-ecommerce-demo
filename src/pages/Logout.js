import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../contexts/userContext';
import Swal from "sweetalert2";

export default function Logout() {
  const { unsetUser, setUser } = useContext(userContext);
  if (localStorage.getItem("token") !== null) {
    Swal.fire({
      title: "Logout Successful",
      iconHtml: `<img src="https://8-bitty.carrd.co/assets/images/image03.gif?v=529504f1" alt="Close button" width="150px"/>`,
      customClass: {
        icon: 'no-border'
      },
      text: "You can revive back by logging in!"
    })
  }

  unsetUser();
  useEffect(() => {
    return () => {
      setUser({ id: null, isAdmin: null });
    }
  })
  return (
    <Navigate to="/" />
  )
}
