import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Github() {
  const navigate = useNavigate();

  function MyFunction() {
 // window.location.replace("https://www.w3schools.com")
  window.open("https://github.com/Laser420/fei-community-frontend");
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
export default Github;