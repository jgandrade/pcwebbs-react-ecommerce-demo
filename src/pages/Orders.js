import React, { useState, useEffect } from 'react'

export default function Orders() {
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
    <div>
      <p>Orders:</p>
      {
        userData.userOrders !== undefined
          ?
          userData.userOrders.length > 0
            ?
            userData.userOrders.map((e, i) => {
              return (
                <div key={i}>
                  <p>Order Id: {e.orderId}</p>
                  <p>Product Id: {e.productId}</p>
                  <p>Product Name: {e.productName}</p>
                  <p>Product Quantity Ordered: {e.quantity}</p>
                  <p>Address: {e.address}</p>
                  <p>Total Price: {e.totalPrice}</p>
                  <p>Ordered On: {e.orderedOn}</p>
                  <p>-------------------------------------------</p>
                </div>
              )
            })
            :
            <p>Nothing in your cart yet.</p>
          :
          <></>
      }
    </div>
  )
}
