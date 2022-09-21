import React from 'react'
import { Link } from 'react-router-dom';

export default function Error() {
    let gifs = [
        "https://i.gifer.com/origin/64/649852e53b7e4edf15ea1c2f23a61f29_w200.gif",
        "https://giffiles.alphacoders.com/124/12434.gif",
        "http://31.media.tumblr.com/f599051c53107e47acc2e23b4ef2124d/tumblr_mt2tl2RJ5H1rwf1kno1_1280.gif",
        "https://i.gifer.com/1Y4S.gif",
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a67ac30c-fe21-4e97-8dad-ffa8b2670167/dbp6qj1-eaae0ccf-b87c-4509-895a-995cd53bafbe.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E2N2FjMzBjLWZlMjEtNGU5Ny04ZGFkLWZmYThiMjY3MDE2N1wvZGJwNnFqMS1lYWFlMGNjZi1iODdjLTQ1MDktODk1YS05OTVjZDUzYmFmYmUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.L9jOG8x4e3R0TEsYb11Vv8LBB_hUinUhpnm7o3-XGGc"
    ]
    let gifIndex = Math.floor(Math.random() * gifs.length);
    return (
        <>
            <div className="justify-content-center align-items-center d-flex flex-column my-5">
                <p>The page you were looking for doesn't exist</p>
                <img style={{ minWidth: "200px", maxWidth: "300px" }} src={gifs[gifIndex]} alt="gif" />
            </div>
        </>
    )
}
