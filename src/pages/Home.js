import React from 'react';
import { useState, useEffect, useContext } from 'react';
import userContext from '../contexts/userContext';
import ProductCard from '../components/ProductCard';
import Admin from './Admin';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Pagination from '../components/Pagination';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const { user } = useContext(userContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      });


  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    !user.isAdmin
      ?
      <>
        <Hero />                                      
        <Pagination key="page-top" keyPage="page-top" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
        <div className='d-flex justify-content-around align-items-center flex-wrap'>
          <Products products={currentProduct} loading={loading} />
        </div>
        <Pagination key="page-bottom" keyPage="page-bottom" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
      </>
      :
      <>
        <Admin />
      </>
  )
}
