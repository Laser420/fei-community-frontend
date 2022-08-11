import React from 'react';
import { ethers } from 'ethers';
import './Opportunities.css';
import Opp from './OppFolder/Opp.js';

import FEI_USD_ABI from './contracts/FEI_USD_ABI.json'; //FEI ERC20 token ABI

const FEI_USD_ADD = "0x956F47F50A910163D8BF957Cf5846D573E7f87CA"; // FEI ERC20 address
const FEI_USD_ABI_PRS = JSON.parse(JSON.stringify(FEI_USD_ABI)); // Parse the FEI ERC20 ABI


class Opportunities extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
        dataPassTest: 12,
    
    };
  }


render() {
  console.log(typeof(abiTest))

    return(
      <div>
          <div className='main-app'>
            <h1> Opportunities </h1>
            <p> Descripti: aka here is a list of ways you can use your FEI....bruh</p>
            <br></br>

            <Opp 
             name = "Opportunity 1"
             desc = "description 1"
             link = "https://www.w3schools.com/"
             addressFEI = {FEI_USD_ADD} //FEI ERC20 address
             abiFEI = {FEI_USD_ABI_PRS} //FEI ERC20 ABI
             />

            <Opp 
             name = "Opportunity 2"
             desc = "description 2"
             link = "https://www.w3schools.com/"
             addressFEI = {FEI_USD_ADD} //FEI ERC20 address
             abiFEI = {FEI_USD_ABI_PRS} //FEI ERC20 ABI
             />

          </div>
      </div>
    
    )

  } //End of Render Method
} //End of Class


export default Opportunities;