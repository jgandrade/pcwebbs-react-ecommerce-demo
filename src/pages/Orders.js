import React, { useState, useEffect, useContext } from 'react'
import userContext from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

export default function Orders() {
  const { user } = useContext(userContext);
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
      });
  }, []);

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
    !user.isAdmin && localStorage.getItem("token") != null
      ?
      <div className='my-5 mx-3'>
        <p>Welcome to your Orders History</p>
        {
          userData.userOrders !== undefined
            ?
            userData.userOrders.length > 0
              ?
              userData.userOrders.map((e, i) => {
                let image = "";
                products.forEach(el => el._id === e.productId ? image = el.img : "");

                return (
                  <div key={i} className="d-flex flex-column flex-lg-row justify-content-start align-items-center my-5 orders-details">
                    <img src={image} className="w-25" style={{ minWidth: "200px", maxWidth: "400px" }} alt={e.orderId} />
                    <div>
                      <p>Order Id: {e.orderId}</p>
                      <p>Product Name: {e.productName}</p>
                      <p>Product Quantity Ordered: {e.quantity}</p>
                      <p>Address: {e.address}</p>
                      <p>Total Price: {e.totalPrice}</p>
                      <p>Ordered On: {e.orderedOn}</p>
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
