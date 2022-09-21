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
        <div className="row mx-auto my-5 d-flex justify-content-around">
          <div className="col-md-5">
            <h1 className="display-4 fw-normal">Welcome to pcwebbs!</h1>
            <p className="lead fw-normal">Your one stop shop for old and new computers! </p>
            <a className="btn btn-outline-secondary" href="#">See Products</a>
          </div>
          <img className="col-md-4 d-none d-md-block" src="https://media.giphy.com/avatars/danielfigueirdo/mR5uHXLuePGT.gif" />
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>

        <div class="row">
          <div class="col-lg-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

            <h2 class="fw-normal">Heading</h2>
            <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
            <p><a class="btn btn-secondary" href="#">View details »</a></p>
          </div>
          <div class="col-lg-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

            <h2 class="fw-normal">Heading</h2>
            <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
            <p><a class="btn btn-secondary" href="#">View details »</a></p>
          </div>
          <div class="col-lg-4">
            <svg class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"></rect><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text></svg>

            <h2 class="fw-normal">Heading</h2>
            <p>And lastly this, the third column of representative placeholder content.</p>
            <p><a class="btn btn-secondary" href="#">View details »</a></p>
          </div>
        </div>

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
