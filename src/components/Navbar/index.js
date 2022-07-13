import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navlink, Bars, NavMenu, NavBtn, NavBtnLink 
} from './NavbarElements';
import Home from '../../pages';
import 'C:/Users/Testing/Fei_frontend_test/src/components/Navbar/Coconuts_Logo_test.png';

//npm install styled-components
//npm install react-router-dom react-icons

const Navbar = () => {
    return (
        <>
        <Nav> 
            <NavLink to="/" >
            <img
                 src={require('./Coconuts_Logo_test.png')}
            />
            </NavLink>
        <NavMenu>
            <NavBtn>
             <NavBtnLink to='/Whitepaper'> Whitepaper</NavBtnLink>
            </NavBtn>

            <NavBtn>
                <NavBtnLink to='/Github'> Github </NavBtnLink>
            </NavBtn>

            <NavBtn>
                <NavBtnLink to='/Voting'> Voting </NavBtnLink>
            </NavBtn>
         </NavMenu>
            <NavBtn>
                <NavBtnLink to='/PSM_Intro'> Enter DAPP</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
}

export default Navbar;