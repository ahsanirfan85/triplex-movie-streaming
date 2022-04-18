import React, { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/tmovie.png';

 import Userfront from '@userfront/react';
import LogoutButton from '../Login/LogoutButton';

const headerNav = [
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
// const LogoutButton = Userfront.build({
//   toolId: "blboal"
// });
const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);
    useEffect(() => {
        Userfront.init('9ny8z7vb')
    }, []);
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
                    {/* <li>
                    <LogoutButton />
                    </li> */}
                    <LogoutButton />
                </ul>
            </div>
        </div>
    );
}

export default Header;
