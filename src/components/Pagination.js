import React from 'react'

export default function Pagination({ productsPerPage, totalProducts, setCurrentPage, keyPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div key={`${keyPage}`} className='col-12'>
            <ul className='pagination d-flex justify-content-center align-items-center flex-wrap'>
                {pageNumbers.map((e, i) => {
                    return (
                        <>
                            <li key={i} className="page-item">
                                <button key={e} onClick={() => setCurrentPage(e)} className='page-link'>
                                    {e}
                                </button>
                            </li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}
