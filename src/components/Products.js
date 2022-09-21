import React from 'react'
import ProductCard from './ProductCard'

export default function Products({ products, loading }) {
    if (loading) {
        return <p>Loading...</p>
    }

    const allProducts = products.map((e,i)=>{
        return <ProductCard key={e._id} {...e} load={i+1}/>
    })

    return (
        <>
            {allProducts}
        </>
    )
}
