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

  function getProducts() {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        shuffle(data.data);
      });
  }

  function getSpecificProduct(category) {
    fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
      .then(response => response.json())
      .then(data => {
        let dataFetch = data.data.filter(e => e.category.toLowerCase() === category)
        shuffle(dataFetch);
      });
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

  //https://www.webmound.com/shuffle-javascript-array/ Fisher-Yates algorithm
  const shuffle = (array) => {
    const newArray = [...array];
    newArray.reverse().forEach((item, index) => {
      const j = Math.floor(Math.random() * (index + 1));
      [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return setProducts(newArray);
  };

  return (
    !user.isAdmin
      ?
      <>
        {
          localStorage.getItem("token") !== null
            ?
            <>
              
              <div className='my-5 mx-5'>
                <div className="d-flex justify-content-center align-items-center my-5 flex-wrap">
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={getProducts}>All</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("processor")}>Processors</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("gpu")}>GPUs</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("memory")}>Memory</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("motherboard")}>Motherboard</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("chassis")}>Chassis</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("monitor")}>Monitor</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("peripherals")}>Peripherals</Button>
                  <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("consoles")}>Consoles</Button>
                </div>

                <Pagination key="page-top" keyPage="page-top" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
                <div id="products" className='d-flex justify-content-around align-items-center flex-wrap'>
                  {
                    products.length > 0
                      ?
                      <Products products={currentProduct} loading={loading} />
                      :
                      <p>Nothing to display</p>
                  }
                </div>
                <Pagination key="page-bottom" keyPage="page-bottom" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
              </div>
              <div className="d-flex justify-content-center align-items-center my-5 flex-wrap">
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={getProducts}>All</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("processor")}>Processors</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("gpu")}>GPUs</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("memory")}>Memory</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("motherboard")}>Motherboard</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("chassis")}>Chassis</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("monitor")}>Monitor</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("peripherals")}>Peripherals</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("consoles")}>Consoles</Button>
              </div>
            </>
            :
            <>
              <Hero />
              <div className="d-flex justify-content-center align-items-center my-5 flex-wrap">
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={getProducts}>All</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("processor")}>Processors</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("gpu")}>GPUs</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("memory")}>Memory</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("motherboard")}>Motherboard</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("chassis")}>Chassis</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("monitor")}>Monitor</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("peripherals")}>Peripherals</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("consoles")}>Consoles</Button>
              </div>
              <Pagination key="page-top" keyPage="page-top" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
              <div id="products" className='d-flex justify-content-around align-items-center flex-wrap'>
                {
                  products.length > 0
                    ?
                    <Products products={currentProduct} loading={loading} />
                    :
                    <>
                      <p>Nothing to display</p>
                    </>
                }
              </div>
              <Pagination key="page-bottom" keyPage="page-bottom" totalProducts={products.length} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} />
              <div className="d-flex justify-content-center align-items-center my-5 flex-wrap">
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={getProducts}>All</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("processor")}>Processors</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("gpu")}>GPUs</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("memory")}>Memory</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("motherboard")}>Motherboard</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("chassis")}>Chassis</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("monitor")}>Monitor</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("peripherals")}>Peripherals</Button>
                <Button className="mx-2 my-2" variant="outlined" color="error" onClick={() => getSpecificProduct("consoles")}>Consoles</Button>
              </div>
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
