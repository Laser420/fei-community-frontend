import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Voting() {
  const navigate = useNavigate();

  function MyFunction() {
 // window.location.replace("https://www.w3schools.com")
  window.open("https://www.tally.xyz/governance/eip155:1:0x0BEF27FEB58e857046d630B2c03dFb7bae567494");
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
export default Voting;