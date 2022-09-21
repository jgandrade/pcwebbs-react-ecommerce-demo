import React from 'react';
import { useState, useEffect, useContext } from 'react';
import userContext from '../contexts/userContext';
import Admin from './Admin';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Pagination from '../components/Pagination';
import { Button } from "@mui/material"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
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
        {
          localStorage.getItem("token") !== null
            ?
            <>
              <div className='my-5 mx-5'>
                <h6>Categories:</h6>
                <div className="d-flex justify-content-center align-items-center my-5 flex-wrap">
                  <Button className="mx-2" variant="outlined" color="error">Processors</Button>
                  <Button className="mx-2" variant="outlined" color="error">GPUs</Button>
                  <Button className="mx-2" variant="outlined" color="error">Memory</Button>
                  <Button className="mx-2" variant="outlined" color="error">Motherboard</Button>
                  <Button className="mx-2" variant="outlined" color="error">Chassis</Button>
                  <Button className="mx-2" variant="outlined" color="error">Monitor</Button>
                  <Button className="mx-2" variant="outlined" color="error">Peripherals</Button>
                  <Button className="mx-2" variant="outlined" color="error">Consoles</Button>
                </div>

                <Pagination key="page-top" keyPage="page-top" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
                <div id="products" className='d-flex justify-content-around align-items-center flex-wrap'>
                  <Products products={currentProduct} loading={loading} />
                </div>
                <Pagination key="page-bottom" keyPage="page-bottom" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
              </div>
            </>
            :
            <>
              <Hero />
              <Pagination key="page-top" keyPage="page-top" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
              <div id="products" className='d-flex justify-content-around align-items-center flex-wrap'>
                <Products products={currentProduct} loading={loading} />
              </div>
              <Pagination key="page-bottom" keyPage="page-bottom" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
            </>
        }
      </>
      :
      <>
        <h5 className='my-5'>Admin Dashboard</h5>
        <Admin />
      </>
  )
}
