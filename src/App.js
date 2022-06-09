import './App.css';
//import { BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/';
import Home from './pages';
import Github from './pages/Github';
import Voting from './pages/Voting';
import Whitepaper from './pages/Whitepaper';
import Footer from './components/Footer/Footer';
import DAPP from './pages/DAPP';

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
         <Route path="/Whitepaper" element={<Whitepaper />} />
         <Route path="/Github" element={<Github />} />
         <Route path="/DAPP" element={<DAPP />} />
        </Routes>
       <Footer />
  </HashRouter>
  )
}
//router tags replaced by HashRouter


export default App;
