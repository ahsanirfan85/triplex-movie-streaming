import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/tmovie.png';
import LogoutButton from '../Login/LogoutButton';
import Cookies from 'js-cookie'
import Userfront from '@userfront/core';

const Header = () => {
    const loggedOut = [
        {
            display: 'Home',
            path: '/'
        },
        {
            display: 'Login',
            path: '/login'
        },
        {
            display: 'Sign Up',
            path: '/signup'
        }
    ];

    const loggedIn = [
        {
            display: `Welcome, ${Userfront.user.name}!`,
            path: ''
        },
        {
            display: 'Home',
            path: '/'
        },
        {
            display: 'Movies',
            path: '/movie'
        },
        {
            display: 'TV Series',
            path: '/tv'
        }
    ];
    
    const [headerNav, setHeaderNav] = useState(loggedOut);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookies = Cookies.get();

        if (Object.keys(cookies).length !== 0) {
            setHeaderNav(loggedIn);
            setIsLoggedIn(true);
        }
        
    }, []);

    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                        
                    }
                    {isLoggedIn ? <LogoutButton /> : ""}
                </ul>
            </div>
        </div>
    );
}

export default Header;