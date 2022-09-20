import React from 'react';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import '../assets/burgerBtn.css';
import userContext from '../contexts/userContext';

export default function Navbar() {
    const { user } = useContext(userContext);
    const [isNavOpen, setNavOpen] = useState(false);

    function openNav() {
        const menuBtn = document.querySelector('.menu-btn');
        const navMenu = document.querySelector('.nav-btn-container');

        if (!isNavOpen) {
            menuBtn.classList.add('open');
            navMenu.classList.add('nav-btn-container-open');
            navMenu.classList.remove('nav-btn-container-close');
            setNavOpen(true);
        } else {
            navMenu.classList.add('nav-btn-container-close');
            menuBtn.classList.remove('open');
            navMenu.classList.remove('nav-btn-container-open');
            setNavOpen(false);
        }
    }

    return (
        <nav>
            <h1 className='logo'><Link to="/">pcwebbs</Link></h1>
            <form className='search-form search-form-close-out'>
                <input className='search-bar' type="text" placeholder='Search' />
                <SearchIcon className='search-icon' style={{ fontSize: "2em", color: "#FFFFFF" }} />
            </form>
            <div className='nav-btn-container nav-btn-container-close'>
                <form className='search-form search-form-close-in'>
                    <input className='search-bar' type="text" placeholder='Search' />
                    <SearchIcon className='search-icon' style={{ fontSize: "2em", color: "#FFFFFF" }} />
                </form>
                {
                    user.id != null
                        ?
                        user.isAdmin
                            ?
                            <>
                                <Link to="/logout"><button className='nav-btn mx-2'>Logout</button></Link>
                            </>
                            :
                            <>
                                <Link to="/orders"><button className='nav-btn mx-2'>Orders</button></Link>
                                <Link to="/cart"><button className='nav-btn mx-2'>Cart</button></Link>
                                <Link to="/account"><button className='nav-btn mx-2'>Account</button></Link>
                                <Link to="/logout"><button className='nav-btn mx-2'>Logout</button></Link>
                            </>
                        :
                        <>
                            <Link to="/login"><button className='nav-btn mx-2'>Login</button></Link>
                            <Link to="/register"><button className='nav-btn mx-2'>Register</button></Link>
                        </>
                }
            </div>
            <div className="menu-btn" onClick={openNav}>
                <div className="menu-btn__burger"></div>
            </div>
        </nav>
    )
}
