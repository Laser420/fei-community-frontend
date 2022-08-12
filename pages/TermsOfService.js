import * as React from 'react';
import { Navigate } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function TermsOfService() {

  const navigate = useNavigate();

  function MyFunction() {
 // window.location.replace("https://www.w3schools.com")
  window.open("https://www.gnu.org/licenses/gpl-3.0.en.html");
  //navigate('./index.js')
 }

 useEffect(() => {
  // Update the document title using the browser API
  navigate(-1)
});

  return (
    <div>
      <MyFunction />
  </div>
  
  );
}
export default TermsOfService;