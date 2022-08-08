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
                <Link to='/TermsOfService'> License and Terms of Service</Link>
            </h4>
          </div>
        </div>
      </div>
       
      </div>
  );
}

export default Footer;


/* <div className='footer-link-wrapper'>
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
*/