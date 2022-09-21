import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material'

export default function ProductPage() {
    const { product } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/lists`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
            });
    }, []);

    console.log(products);
    return (
        <div className='my-5 mx-5 d-flex flex-column justify-content-center align-items-center    '>
            {
                products.map(e => {
                    if (e.slug === product) {
                        return (
                            <div key={e} className="d-flex flex-md-row flex-column">
                                <img src={e.img} className="img-fluid w-100" />
                                <div>
                                    <h5>{e.productName}</h5>
                                    <p>{e.productDescription}</p>
                                    <h6>Price:</h6>
                                    <p>&#8369;{e.productPrice}</p>
                                    <h6>Stocks:</h6>
                                    <p>{e.productStocks}</p>
                                    <h6>Category:</h6>
                                    <p>{e.category}</p>
                                    <Button variant="contained" color="error">Add To Cart</Button>
                                </div>
                            </div>
                        )

                    }
                })
            }
        </div>
    )
}
