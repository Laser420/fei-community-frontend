import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h4>
                <Link to='/'>Placeholder</Link>
            </h4>
          </div>
          <div class='footer-link-items'>
            <h4>
                <Link to='/'>Placeholder</Link>
            </h4>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h4>
                <Link to='/'>Placeholder</Link>
            </h4>
          </div>
          <div class='footer-link-items'>
            <h4>
                <Link to='/'>Placeholder</Link>
            </h4>
          </div>
        </div>
      </div>
          <small class='website-rights'>DAO © 2022</small>
          <div class='social-icons'>
          </div>
        </div>
  );
}

export default Footer;