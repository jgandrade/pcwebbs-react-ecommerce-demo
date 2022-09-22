import React from 'react'
import ProductCard from './ProductCard'

export default function Products({ products, loading }) {
    if (loading) {
        return (
            <>
                <div className='d-flex justify-content-center align-content-center'>
                    <p>Products are Loading ...</p>
                    <img src="https://66.media.tumblr.com/6fedb7b15a4e7a6814c5c8cc2485fa68/tumblr_mnu21dLKE81rfjowdo1_500.gif" alt="Mega man" width="150px" />
                </div>
            </>
        )
    }

    const allProducts = products.map((e, i) => {
        return <ProductCard key={e._id} {...e} load={i + 1} />
    })

    return (
        <>
            {allProducts}
        </>
    )
}
