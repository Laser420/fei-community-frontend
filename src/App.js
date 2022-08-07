import './App.css';
//import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './pages';
import Github from './pages/Github';
import Voting from './pages/Voting';
import TermsOfService from './pages/TermsOfService';
import Footer from './components/Footer/Footer';
import DAPP from './pages/DAPP';
import PSM_Intro from './pages/PSM_Intro';
import FEI_DAI_PSM from './pages/FEI_DAI_PSM';

/*
function App() {
  return(
   <div>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="./test.js">Test</Link>
    </nav>
    <h1> Fuck you</h1>
  </div>
  );
}
*/


function App() {
  return (
  <HashRouter>
      <Navbar />
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Voting" element={<Voting />} />
         <Route path="/Github" element={<Github />} />
         <Route path="/TermsOfService" element={<TermsOfService />} />
         <Route path="/PSM_Intro" element={<PSM_Intro />} />
         <Route path="/DAPP" element={<DAPP/>} />
         <Route path="/FEI_DAI_PSM" element={<FEI_DAI_PSM/>} />
        </Routes>
       <Footer />
  </HashRouter>
  )
}
//router tags replaced by HashRouter
//<Route path="/Whitepaper" element={<Whitepaper />} />


export default App;
