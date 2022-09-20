import React from 'react';
import { useState, useEffect, useContext } from 'react';
import userContext from '../contexts/userContext';
import ProductCard from '../components/ProductCard';
import Admin from './Admin';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => setProducts(data.data));
  }, []);

  const allProducts = products.map(e => {
    return <ProductCard key={e._id} {...e} />
  })

  return (
    !user.isAdmin
      ?
      <>
        <div className='d-flex justify-content-around align-items-center flex-wrap'>
          {allProducts}
        </div>
      </>
      :
      <>
        <Admin />
      </>
  )
}
