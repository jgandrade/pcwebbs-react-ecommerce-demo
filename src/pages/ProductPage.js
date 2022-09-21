import React from 'react'
import { useParams } from 'react-router-dom';


export default function ProductPage() {
    const { product } = useParams();
    return (
        <div>
            {product}
        </div>
    )
}
