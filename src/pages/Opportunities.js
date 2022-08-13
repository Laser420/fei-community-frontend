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
             //Link to the opportunity's website page
             link = "https://www.w3schools.com/"
             //change this to the address of the zap contract
             //If the opportunity is single-action then change it to the address of the opportunity
             zapADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2" 
             //Import and Parse the ABI of the opportunity to a variable, then set this to that variable
             //I plan on just manually putting every opportunity ABI.json into this project and into this file
             zapABI = {FEI_DAI_PSM_ABI_PRS} 
            //This is the call made by the frontend to enter the opportunity 
            //If the opportunity requires multiple actions then a solidity zap contract will need to be made and called
            //If the opportunity is one and done (Clinton's Sex Tape: 1998) then call whatever function deposits into the opp
             enterCall = "deposit" 
            //An array of arguments to pass to the contract call for entering the opportunity.
            //This array can vary in length depending on what the opportunity contract needs to know
             argsEnter = {
              ["0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2", "replaceWithUserNumInput" ,]
             }
             //This is an important number: where in the array of arguments does the user input go....
             //User input being the number of FEI they choose to zap after passed through a lot of substring math to add zeroes
             indexOfInputEnter = "1"
             //This is the call made by the frontend to exit the opportunity
              //If the opportunity requires multiple actions then a solidity zap contract will need to be made and called
            //If the opportunity is one and done (Clinton's Sex Tape: 1998) then call whatever function exits from the opp
             exitCall = "leaveMeAlone"

             /* WILL NEED TO ADD: argsExit and indexOfInputExit */
          />

          <Opp 
            name = "Opportunity 2"
            desc = "description 2"
            //Link to the opportunity's website page
            link = "https://www.w3schools.com/"
            //change this to the address of the zap contract
            //If the opportunity is single-action then change it to the address of the opportunity
            zapADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2" 
            //Import and Parse the ABI of the opportunity to a variable, then set this to that variable
            //I plan on just manually putting every opportunity ABI.json into this project and into this file
            zapABI = {FEI_DAI_PSM_ABI_PRS} 
           //This is the call made by the frontend to enter the opportunity 
           //If the opportunity requires multiple actions then a solidity zap contract will need to be made and called
           //If the opportunity is one and done (Clinton's Sex Tape: 1998) then call whatever function deposits into the opp
            enterCall = "deposit" 
           //An array of arguments to pass to the contract call for entering the opportunity.
           //This array can vary in length depending on what the opportunity contract needs to know
            argsEnter = {
             ["0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2", "replaceWithUserNumInput" ,]
            }
            //This is an important number: where in the array of arguments does the user input go....
            //User input being the number of FEI they choose to zap after passed through a lot of substring math to add zeroes
            indexOfInputEnter = "1"
            //This is the call made by the frontend to exit the opportunity
             //If the opportunity requires multiple actions then a solidity zap contract will need to be made and called
           //If the opportunity is one and done (Clinton's Sex Tape: 1998) then call whatever function exits from the opp
            exitCall = "leaveMeAlone"

            /* WILL NEED TO ADD: argsExit and indexOfInputExit */
          />

          </div>
      </div>
    
    )

  } //End of Render Method
} //End of Class

// [this.props.enterCall]
export default Opportunities;