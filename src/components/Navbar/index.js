import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navlink, Bars, NavMenu, NavBtn, NavBtnLink 
} from './NavbarElements';
import Home from '../../pages';
import './Coconuts_Logo_test.png';

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
                Click the coconut to go home.
            </NavLink>
        <NavMenu>

            <NavBtn>
                <NavBtnLink to='/Github'> Github </NavBtnLink>
            </NavBtn>

            <NavBtn>
                <NavBtnLink to='/Voting'> Voting </NavBtnLink>
            </NavBtn>
         </NavMenu>
            <NavBtn>
                <NavBtnLink to='/PSM_Intro'> Enter dApp</NavBtnLink>
            </NavBtn>
        </Nav>
        </>
    );
}

export default Navbar;