import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Installing reactRouterDom: "npm install react-router-dom@6"
//https://reactrouter.com/docs/en/v6/getting-started/overview#installation

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <App />
/* - 
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="test.js" element={<Test />} />
   </Routes>
</BrowserRouter>
*/

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
