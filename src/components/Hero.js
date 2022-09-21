import React from 'react'

export default function Hero() {
    return (
        <>
            <div className="row mx-auto my-5 d-flex justify-content-around">
                <div className="col-md-5">
                    <h1 className="display-4 fw-normal" data-aos="zoom-out-down" data-aos-delay="100">Welcome to pcwebbs!</h1>
                    <p className="lead fw-normal" data-aos="zoom-out-down" data-aos-delay="200">Your one stop shop for old and new computers! </p>
                    <a className="btn btn-outline-secondary" href="#" data-aos="zoom-out-down" data-aos-delay="300">See Products</a>
                </div>
                <img className="col-md-4 d-none d-md-block" src="https://media.giphy.com/avatars/danielfigueirdo/mR5uHXLuePGT.gif" data-aos="zoom-out-down" data-aos-delay="700"/>
            </div>
           
            <div className="row text-center my-5">
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between" data-aos="zoom-in" data-aos-delay="300">
                    <div className="ratio ratio-1x1 w-50 rounded-circle overflow-hidden">
                        <img src="https://media2.giphy.com/media/E3y79zUo2V4v8AFG2V/giphy.gif" className="img-cover" />
                    </div>
                    <h4 className="fw-normal">NFT Payment</h4>
                    <p>We accept NFT Payments here. It's already 2022 and NFT will be the next big thing.</p>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between" data-aos="zoom-in" data-aos-delay="600">
                    <div className="ratio ratio-1x1 w-50 rounded-circle overflow-hidden">
                        <img src="https://c.tenor.com/61vG3YfDrUMAAAAC/wreck-it-ralph-disney.gif" className="img-cover" />
                    </div>
                    <h4 className="fw-normal">Free Consult</h4>
                    <p>Some of our products here are really expensive, so we give consultation for free.</p>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-between" data-aos="zoom-in" data-aos-delay="900">
                    <div className="ratio ratio-1x1 w-50 rounded-circle overflow-hidden">
                        <img src="https://media1.giphy.com/media/pItZ4gr8ZywDAqbc8X/giphy.gif?cid=ecf05e47utu0xn3ugaix90fj75cyfbpp1he2b8odhhhfmjqq&rid=giphy.gif&ct=g" className="img-cover" />
                    </div>
                    <h4 className="fw-normal">Sales and Discounts</h4>
                    <p>Every month we have an exciting discounts and sudden price sales. You don't want to miss that out</p>
                    <p><a className="btn btn-secondary" href="#">View details »</a></p>
                </div>
            </div>
        </>
    )
}
