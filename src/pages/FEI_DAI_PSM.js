import React from 'react';
import { ethers } from 'ethers';

import test_Contract from 'C:/Users/Testing/Fei_frontend_test/src/Contracts/test_Contract.json';

import FEI_USD_ABI from 'C:/Users/Testing/Fei_frontend_test/src/Contracts/FEI_USD_ABI.json'; //FEI ERC20 token ABI
import DAI_ABI from 'C:/Users/Testing/Fei_frontend_test/src/Contracts/DAI_ABI.json'; // DAI ERC20 token ABI

import './FEI_DAI_PSM.css';
import FEI_DAI_PSM_ABI from 'C:/Users/Testing/Fei_frontend_test/src/Contracts/FEI_DAI_PSM.json'; // FEI-DAI PSM Abi import
const FEI_DAI_PSM_ADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2"; // FEI-DAI PSM address
const FEI_DAI_PSM_ABI_PRS = JSON.parse(JSON.stringify(FEI_DAI_PSM_ABI)); //This worked, parsed the stringified ABI manually

const abiTest = JSON.parse(JSON.stringify(test_Contract)); //This worked, parsed the stringified ABI manually

const FEI_USD_ADD = "0x956F47F50A910163D8BF957Cf5846D573E7f87CA"; // FEI ERC20 address
const FEI_USD_ABI_PRS = JSON.parse(JSON.stringify(FEI_USD_ABI)); // Parse the FEI ERC20 ABI

const DAI_ADD =  "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //DAI ERC20 address
const DAI_ABI_PRS = JSON.parse(JSON.stringify(DAI_ABI));  // Parse it

class FEI_DAI_PSM extends React.Component {
 constructor(props) {
    super(props);
    this.state = {

      //Connecting to the wallet
     walletConnected: false, // boolean determining if a wallet is connected
     wbtnMsg: "Check/Connect Wallet", // Connect wallet button msg
     walletBtnClass: 'cta-button connect-wallet-button', // CSS class for Connect Wallet Button
    
     //Reading from the blockchain
     infoBtnMsg: "Grab my port folio",

    //number for button ued when minting
     mintNum: 0,

     //number for button used when redeeming
     redeemNum: 0,

     //Form input state
     wrapUnwrapToggle: false,
    };
  }


  connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("You will not be able to interact without an installed Ethereum provider.");
      
    }else if(ethereum)
    {
      try {
       alert("Ethereum is loaded on your browser. Be sure to check if your wallet is connected.")
       } catch (err) {
      this.state.status = "Err";
      console.log(err)
    }
    }
   }


  componentDidMount(){
    this.connectWalletHandler();
  }


render() {
    console.log(typeof(abiTest))

    /* Connect Wallet Button
      Onclick reads the connectWallethandler function
      The styling class changes based on the state walletBtnClass value (updated in the handler function)
      The message changes based on the state btnMsg value (updated in the handler function)
    */
    const connectWalletButton = () => {
      return (
        <button onClick={connectWalletHandler} className={this.state.walletBtnClass}>
          {this.state.wbtnMsg}
        </button>
      )
    }

    /* ConnectWallet Handler function
      First attempts to load an Ethereum window - sends an alert if it is not found
      If it finds ethereum: loads the provider and the account onto variables
      After that it changes the ConnectWallet btnMsg to display connected network and address
      Changes the CSS styling of the button to a different class which works better with the new btnMSG
    */
     const connectWalletHandler = async () => {
       const { ethereum } = window;
       if (!ethereum) {
         alert("Please install Metamask!");
         this.setState({btnMsg : "Please install Metamask."});
       }
       try {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         console.log("Found an account! Address: ", accounts[0]);
         this.setState({wbtnMsg : "Connected to: " + "[" + (await provider.getNetwork()).name + "] " + accounts[0]});
         this.setState({walletBtnClass: 'cta-button wallet-connected-button'});
         this.setState({walletConnected: true});
         //Catch errors
       } catch (err) {
         this.state.status = "Err";
         console.log(err)
       }
       {Fei_Balance_Checker()} // Check the connected wallet's FEI balance
       {DAI_Balance_Checker()} // Check the connected wallet's DAI balance
     }
    

     const Fei_Balance_Checker = async () => {
      if(this.state.walletConnected === true) {

      const { ethereum } = window; 

      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const contractObject = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, provider);
      const result = await contractObject.balanceOf(accounts[0]);
      const resultStr = result.toString();
      console.log(resultStr);
      
      //Take our result and make it legible with two decimal points
      const lengthNonD = resultStr.length - 18;
      const nonDecimal = resultStr.substring(0, lengthNonD);
      
      const lengthOfD = resultStr.length - 16;
      const decimal = resultStr.substring(lengthNonD, lengthOfD);
  
      const returnStr = nonDecimal + "." + decimal;
  
      this.setState({redeemNum : returnStr}); // display the amount of FEI we have
      //This balance is used in the redeem value to show how much DAI can be redeemed
   } else if (this.state.walletConnected === false) {
    console.log("Wallet not connected.")
   }
  }

  const DAI_Balance_Checker = async () => {
    if(this.state.walletConnected === true) {

    const { ethereum } = window; 

    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const contractObject = new ethers.Contract(DAI_ADD, DAI_ABI_PRS, provider);
    const result = await contractObject.balanceOf(accounts[0]);
    const resultStr = result.toString();
    console.log(resultStr);

    //Take our result and make it legible with two decimal points
    const lengthNonD = resultStr.length - 18;
    const nonDecimal = resultStr.substring(0, lengthNonD);
    
    const lengthOfD = resultStr.length - 16;
    const decimal = resultStr.substring(lengthNonD, lengthOfD);

    const returnStr = nonDecimal + "." + decimal;

    this.setState({mintNum : returnStr}); //Display the amount of DAI this account has
    //Allows us to show how much FEI can be minted with this DAI
 } else if (this.state.walletConnected === false) {
  console.log("Wallet not connected.")
 }
}

     
  
  const mintButtonHandler = () => {

    let inputStr = this.state.mintNum;

    if(this.state.mintNum.includes(".")){
      const mintNumSplitArray = this.state.mintNum.split("."); // First split our value into two strings at the decimal
      const wholeNum = mintNumSplitArray[0]; // the whole number is simply the part before the decimal point
      let decimals = mintNumSplitArray[1]; // the decimals are the numbers after the decimal point
      for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
          decimals = decimals + "0";
      }

      inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added
      alert("Number input has a decimal point. Our first half of the string is: " + wholeNum + " And the second half is " + decimals + " And the whole string is: " + inputStr);
    } 
    else {  //If there is no demical point, the user wants to use a solid number
      //Simply append 18 zeroes to the end of the transaction
      const str = this.state.mintNum;
      inputStr = str + "000000000000000000" 
      alert("No decimal point in the string and our string is: " + inputStr)
    }

  }
    
  

  //Mint FEI with DAI
  //Has some text and will need to read and display values from blockchain
  //Form that allows input of items and upon form submission, calls the mintButtonHandler
  const mintSection = () => {
    return (
    <div className='PSM-div'>
      <h2> Mint</h2>
      <p> Use your DAI to mint FEI.</p>

      <form classname='formClass' onSubmit={mintButtonHandler}>
            <label> How much FEI are you minting?
            <br></br> 
            <br></br>
             <input 
                type="number" 
                value= {this.state.mintNum}
                onChange={(e) => this.setState({mintNum: e.target.value})}
               />
            </label>
            <br></br>
            <br></br>
            <input 
             type="submit" 
             value= {"Mint " + this.state.mintNum + " FEI"} 
             />
           </form>
        <h5> Please note this frontend supports decimal values up to 18 places.  </h5>
    </div>
    )
  }

  const redeemButtonHandler = () => {
    alert("redeemButtonHandler");
}

  //Has some text and will need to read and display values from blockchain
  //Form that allows input of items and upon form submission, calls the redeemButtonHandler
  const redeemSection = () => {
    return (
    <div className='PSM-div'>
      <h2> Redeem </h2>
      <p> Use your FEI to redeem DAI.</p>
    
      <form classname='formClass' onSubmit={redeemButtonHandler}>
            <label> How much FEI are you redeeming?
            <br></br> 
            <br></br>
             <input 
                type="number" 
                value= {this.state.redeemNum}
                onChange={(e) => this.setState({redeemNum: e.target.value})}
               />
            </label>
            <br></br>
            <br></br>
            <input 
             type="submit" 
             value= {"Redeem " + this.state.redeemNum + " DAI"} 
             />
           </form>
    </div>
    )
  }

  return(
    <div>
       <div className='main-app'>
          <div className='connect-wallet-div'>
              {connectWalletButton()}
            </div>

          <h1> Mint and Redeem FEI </h1>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }} >
            {mintSection()}
            {redeemSection()}
          </div>
       </div>
    </div>
  )
   //}
   //{currentAccount ? incrValButton() : connectWalletButton()} - Just a note

} //End of Render Method
} //End of Class

export default FEI_DAI_PSM;