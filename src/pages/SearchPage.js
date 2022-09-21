import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import userContext from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  let { search } = useParams();
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
      });
  }, []);

  const productsSearched = products.map(e => {
    if (e.productName.toLowerCase().includes(search)) {
      return <ProductCard key={e._id} {...e} />;
    }
  })

  return (
    !user.isAdmin
      ?
      <>
        <div>
          <p>You searched {search}</p>
          <div className='d-flex justify-content-around align-items-center col-12 flex-wrap'>
            {productsSearched}
          </div>
        </div>
      </>
      :
      <Navigate to="/" />
  )
}
