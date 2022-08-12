import React from 'react';
import { ethers } from 'ethers';
import './Opportunities.css';
import Opp from './OppFolder/Opp.js';

import FEI_DAI_PSM_ABI from './contracts/FEI_DAI_PSM.json'; // FEI-DAI PSM Abi import
const FEI_DAI_PSM_ABI_PRS = JSON.parse(JSON.stringify(FEI_DAI_PSM_ABI)); //This worked, parsed the stringified ABI manually

class Opportunities extends React.Component {
 constructor(props) {
    super(props);
    this.state = {

    
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
             zapADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2" //change this to the address of the zap contract - currently FEI-DAI-PSM add
             zapABI = {FEI_DAI_PSM_ABI_PRS} //Import and Parse the ABI of the opportunity to a variable, then set this to that variable
             //NOTE - ALL ZAP CONTRACTS MUST NAME THEIR ZAP FUNCTION "zap"
             />

            <Opp 
             name = "Opportunity 2"
             desc = "description 2"
             link = "https://www.w3schools.com/"
             zapADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2" //change this to the address of the zap contract - currently FEI-DAI-PSM add
             zapABI = {FEI_DAI_PSM_ABI_PRS} //Import and Parse the ABI of the opportunity to a variable, then set this to that variable
             //NOTE - ALL ZAP CONTRACTS MUST NAME THEIR ZAP FUNCTION "zap"
             />

          </div>
      </div>
    
    )

  } //End of Render Method
} //End of Class


export default Opportunities;