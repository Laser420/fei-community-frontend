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

    //the value that will be minted
     mintNum: 0,

     //the allowance of DAI that the user has, needs to be more or equal to the mintNum 
     DallowanceNum: 0,

     //the allowance of FEI that the user has set, needs to be more or equal to the redeemNum
     FallowanceNum: 0,

     //the value that will be redeemed
     redeemNum: 0,

     //When these are false, a button to follow a specific transaction does not appear,
     //when they are true - these buttons do appear
     mintingFei: false,
     redeemingFei: false,


    };
  }

  /* Checking if there is an ethereum provider before displaying the rest of the page, and also testing if there is a connected wallet */
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
       {checkDAIApproval()} // Check the connected wallets DAI approval to the FEI PSM
       {checkFEIApproval()} //Check the connected wallet's FEI approval to the FEI PSM
     }
    
     /* Checks the connected wallet's balance of FEI */
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

  /* Checks the connected wallet's balance of DAI */
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

//
//
//
//  Connect Wallet and Balance Checkers END
//
//
//


//
//
//
// Minting Handlers and checkers START
//
//
//


/* Handles whether or not the transaction is approving the spending limit or if the minting can simply occur
*/
  const mintButtonHandler = () => {

    //If the allowance is >= the minting num
    if(this.state.DallowanceNum >= this.state.mintNum){
      {mintFEIHandler()}
      
    } else { //If the allowanceNum is less than the mintNum
      {approveDAItransactionHandler()}
      //edit this handler to find exactly how much needs to be approved
    }
  }



  //Aprove the current mintNum input of DAI to be used by the FEI_DAI_PSM
  const approveDAItransactionHandler = async () => {
    let inputStr = this.state.mintNum;

    if(this.state.mintNum.includes(".")){
      const mintNumSplitArray = this.state.mintNum.split("."); // First split our value into two strings at the decimal
      const wholeNum = mintNumSplitArray[0]; // the whole number is simply the part before the decimal point
      let decimals = mintNumSplitArray[1]; // the decimals are the numbers after the decimal point
      for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
          decimals = decimals + "0";
      }

      inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added
      try {
        const { ethereum } = window;
        if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const DAI_CONT = new ethers.Contract(DAI_ADD, DAI_ABI_PRS, signer);
          console.log("Initialize approval");
          //approve the FEI-DAI_PSM to use 
          let Txn = await DAI_CONT.approve(FEI_DAI_PSM_ADD, inputStr);     
          console.log("Mining... please wait");
          await Txn.wait();
          console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
        } else {
          console.log("Ethereum object does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    } 
    else {  //If there is no demical point, the user wants to use a solid number
      //Simply append 18 zeroes to the end of the transaction
      const str = this.state.mintNum;
      inputStr = str + "000000000000000000" 
      try {
        const { ethereum } = window;
        if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const DAI_CONT = new ethers.Contract(DAI_ADD, DAI_ABI_PRS, signer);
          console.log("Initialize approval");
          //approve the FEI-DAI_PSM to use 
          let Txn = await DAI_CONT.approve(FEI_DAI_PSM_ADD, inputStr); 
          console.log("Mining... please wait");
          await Txn.wait();
          console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
        } else {
          console.log("Ethereum object does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    }    
  }

  
  //Interacts with the FEI PSM 
  //Mints FEI from DAI, minting the mintNum amount
  const mintFEIHandler = async () => {

    let inputStr = this.state.mintNum;

    if(this.state.mintNum.includes(".")){
      const mintNumSplitArray = this.state.mintNum.split("."); // First split our value into two strings at the decimal
      const wholeNum = mintNumSplitArray[0]; // the whole number is simply the part before the decimal point
      let decimals = mintNumSplitArray[1]; // the decimals are the numbers after the decimal point
      for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
          decimals = decimals + "0";
      }

      inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added

      try {
        const { ethereum } = window;
        if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         const FEI_DAI_PSM_CONT = new ethers.Contract(FEI_DAI_PSM_ADD, FEI_DAI_PSM_ABI_PRS, signer);
          console.log("Initialize payment");
          let Txn = await FEI_DAI_PSM_CONT.mint(accounts[0], inputStr,0);        
          console.log("Mining... please wait");
          await Txn.wait();
          console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
        } else {
          console.log("Ethereum object does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    } 
    else {  //If there is no demical point, the user wants to use a solid number
      //Simply append 18 zeroes to the end of the transaction
      const str = this.state.mintNum;
      inputStr = str + "000000000000000000";
      try {
        const { ethereum } = window;
  
        if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         const FEI_DAI_PSM_CONT = new ethers.Contract(FEI_DAI_PSM_ADD, FEI_DAI_PSM_ABI_PRS, signer);
          console.log("Initialize payment");
          let Txn = await FEI_DAI_PSM_CONT.mint(accounts[0], inputStr,0);       
          console.log("Mining... please wait");
          await Txn.wait();
          console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
        } else {
          console.log("Ethereum object does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    }    
  }

  //Check the current amount of DAI approved by the user for the FEI PSM
  //Sets this value to the /DallowanceNum/
  //Called when connecting the wallet
  const checkDAIApproval  = async () => {
    if(this.state.walletConnected === true) {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const contractObject = new ethers.Contract(DAI_ADD, DAI_ABI_PRS, provider);
      //Find the DAI allowance of the user
      const result = await contractObject.allowance(accounts[0], FEI_DAI_PSM_ADD);
      const resultStr = result.toString();
      console.log(resultStr);
      //Take our result and make it legible with two decimal points
      const lengthNonD = resultStr.length - 18;
      const nonDecimal = resultStr.substring(0, lengthNonD);
      const lengthOfD = resultStr.length - 16;
      const decimal = resultStr.substring(lengthNonD, lengthOfD);
      const returnStr = nonDecimal + "." + decimal;
      this.setState({DallowanceNum : returnStr}); // display the amount of FEI we have
      //This balance is used in the redeem value to show how much DAI can be redeemed
   } else if (this.state.walletConnected === false) {
    console.log("Wallet not connected.")
   }
  }

 // For use on the interact button - swaps the button message for user quality of life
  const approveOrMint = () => {
    if(this.state.DallowanceNum >= this.state.mintNum){
      return "Mint " + this.state.mintNum + " FEI."
      
    } else { 
        return "Please approve the use of " + this.state.mintNum + " DAI "
        
    }
  }
 

  //Mint FEI with DAI
  //Has some text and will need to read and display values from blockchain
  //Form that allows input of items and upon form submission, calls the mintButtonHandler
  //If the minting transaction goes through, remember to somehow change the state variable and make the button exist
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
             value= {approveOrMint()} 
             />
           </form>

        <h5> Please note this frontend supports decimal values up to 18 places. </h5>
       </div>
    )
  }


//
//
//
//  Minting Handlers and checkers END
//
//
//


//
//
//
// Redeem Handlers and checkers START
//
//
//

//Determines whether the FEI ERC20 must have approval or whether this transaction can proceed
const redeemButtonHandler = () => {

  //If the allowance is >= the minting num
  if(this.state.FallowanceNum >= this.state.redeemNum){
    {redeemFEIHandler()}
    
  } else { //If the allowanceNum is less than the mintNum
    {approveFEItransactionHandler()}
    //edit this handler to find exactly how much needs to be approved
  }
}

 //Aprove the current redeemNum input of FEI to be used by the FEI_DAI_PSM
 const approveFEItransactionHandler = async () => {
  let inputStr = this.state.redeemNum;

  if(this.state.redeemNum.includes(".")){
    const redeemNumSplitArray = this.state.redeemNum.split("."); // First split our value into two strings at the decimal
    const wholeNum = redeemNumSplitArray[0]; // the whole number is simply the part before the decimal point
    let decimals = redeemNumSplitArray[1]; // the decimals are the numbers after the decimal point
    for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
        decimals = decimals + "0";
    }

    inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added
    try {
      const { ethereum } = window;
      if (ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       const FEI_CONT = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, signer);
        console.log("Initialize approval");
        //approve the FEI-DAI_PSM to use 
        let Txn = await FEI_CONT.approve(FEI_DAI_PSM_ADD, inputStr);     
        console.log("Mining... please wait");
        await Txn.wait();
        console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  } 
  else {  //If there is no demical point, the user wants to use a solid number
    //Simply append 18 zeroes to the end of the transaction
    const str = this.state.redeemNum;
    inputStr = str + "000000000000000000" 
    try {
      const { ethereum } = window;
      if (ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       const FEI_CONT = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, signer);
        console.log("Initialize approval");
        //approve the FEI-DAI_PSM to use 
        let Txn = await FEI_CONT.approve(FEI_DAI_PSM_ADD, inputStr); 
        console.log("Mining... please wait");
        await Txn.wait();
        console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }    
}

//Checks the current amount of FEI approved by the user for interacting with the contract PSM
//Sets this value to FallowanceNum
//Called by the connectwallet handler
const checkFEIApproval  = async () => {
  if(this.state.walletConnected === true) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const contractObject = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, provider);
    //Find the DAI allowance of the user
    const result = await contractObject.allowance(accounts[0], FEI_DAI_PSM_ADD);
    const resultStr = result.toString();
    console.log(resultStr);
    //Take our result and make it legible with two decimal points
    const lengthNonD = resultStr.length - 18;
    const nonDecimal = resultStr.substring(0, lengthNonD);
    const lengthOfD = resultStr.length - 16;
    const decimal = resultStr.substring(lengthNonD, lengthOfD);
    const returnStr = nonDecimal + "." + decimal;
    this.setState({FallowanceNum : returnStr}); // display the amount of FEI we have
    //This balance is used in the redeem value to show how much DAI can be redeemed
 } else if (this.state.walletConnected === false) {
  console.log("Wallet not connected.")
 }
}

//actually redeems the FEI
const redeemFEIHandler = async () => {
  
  let inputStr = this.state.redeemNum;

  if(this.state.redeemNum.includes(".")){
    const redeemNumSplitArray = this.state.redeemNum.split("."); // First split our value into two strings at the decimal
    const wholeNum = redeemNumSplitArray[0]; // the whole number is simply the part before the decimal point
    let decimals = redeemNumSplitArray[1]; // the decimals are the numbers after the decimal point
    for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
        decimals = decimals + "0";
    }

    inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added

    try {
      const { ethereum } = window;
      if (ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       const FEI_DAI_PSM_CONT = new ethers.Contract(FEI_DAI_PSM_ADD, FEI_DAI_PSM_ABI_PRS, signer);
        console.log("Initialize payment");
        let Txn = await FEI_DAI_PSM_CONT.redeem(accounts[0], inputStr,0);        
        console.log("Mining... please wait");
        await Txn.wait();
        console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  } 
  else {  //If there is no demical point, the user wants to use a solid number
    //Simply append 18 zeroes to the end of the transaction
    const str = this.state.redeemNum;
    inputStr = str + "000000000000000000";
    try {
      const { ethereum } = window;

      if (ethereum) {
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
       const FEI_DAI_PSM_CONT = new ethers.Contract(FEI_DAI_PSM_ADD, FEI_DAI_PSM_ABI_PRS, signer);
        console.log("Initialize payment");
        let Txn = await FEI_DAI_PSM_CONT.redeem(accounts[0], inputStr,0);       
        console.log("Mining... please wait");
        await Txn.wait();
        console.log(`Mined, see transaction: https://etherscan.io/tx/${Txn.hash}`);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  }    
}

//For use on the interact button - swaps the button message for user quality of life
const approveOrRedeem = () => {
  if(this.state.FallowanceNum >= this.state.redeemNum){
    return "Redeem " + this.state.redeemNum + " DAI"
    
    
  } else { 
      return "Please approve the use of " + this.state.redeemNum + " FEI"
    
  }
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
             value= {approveOrRedeem()} 
             />
           </form>
            <h5> Please note this frontend supports decimal values up to 18 places. </h5>
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
          <br></br>
          <br></br>

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