import React from 'react';
import { useEffect, useState } from 'react';
import './DAPP.css';
import test_Contract from 'C:/Users/Testing/Fei_frontend_test/src/Contracts/test_Contract.json';
import { ethers } from 'ethers';
import { render } from 'react-dom';

const contractAddress = "0x120813F3aCF3CCb0EEf3F93aD9aE8212A4D22f65";

const abiTest = JSON.parse(JSON.stringify(test_Contract)); //This worked, parsed the stringified ABI manually


class DAPP extends React.Component {
 constructor(props) {
    super(props);
    this.state = {

      //Connecting to the wallet
     walletConnected: false, // boolean determining if a wallet is connected
     wbtnMsg: "Connect Wallet", // Connect wallet button msg
     walletBtnClass: 'cta-button connect-wallet-button', // CSS class for Connect Wallet Button
    
     //Reading from the blockchain
     infoBtnMsg: "Grab my portfolio",
    
     availableBal: null,  //

     //Calling a blockchain function 
     sNum: 0,

     //Form input state
     wrapUnwrapToggle: false,
    };
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
     }

     
     const retrieveInfoButton = () => {
      return (
        <button onClick={retrieveInfoHandler} className={'retrieveInfoBtn'}>
          {this.state.infoBtnMsg} 
        </button>
      )
    }
    /* retrieveInfoHandler
      Handles calling our core blockchain reading functions
    */
    const retrieveInfoHandler = () => {
      {retrieveWalletBal()}
      //Add more reading functions to be able to display more information
    }

     /* retrieveWalletBal:
      Checks for and loads Ethereum
      sets a provider, account and signer into variables
      sets a contract variable
      calls a readable(views) function from the blockchain
      converts the returned value from the views function
      sets that returned value to a state variable for usage elsewhere
      */
     const retrieveWalletBal = async () => {
      const { ethereum } = window;
        if (ethereum) {
          if(this.state.walletConnected= true){
        try {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          //To read a value, I can instantiate the contract under the provider and just read it
          //For executing non-readable function, a signer is required 
          const contractObject = new ethers.Contract(contractAddress, abiTest, provider);
          const result = await contractObject.retrieveBal(accounts[0]);
          console.log(result);
          const resultStr = result.toString();
          this.setState({availableBal: resultStr})
        } catch (err) {
          throw err;
        }
      }
      } else if(!ethereum) {
        alert("Please install Metamask and connect your wallet.");
      }
    };

     /* submitValHandler
      Prevents event defaulting??
      Sends an alert
      Calls the submitVal function
    */
    const submitValHandler = (event) => {
      //Run logic to determine whether or not the wrapUnwrapToggle is toggled or not
      //then after that logic call the correct function
       event.preventDefault();
       alert(`The new balance you entered was: ${this.state.sNum}`)
       submitVal(this.state.sNum)
    }

    /* submitVal
        Core blockchain interaction function
        First, checks for and loads ethereum
        sets a provider, signer and contract into variables
        sets a TXN variable to equal a transaction which-
        -which calls a non-views (regular) function on that contract
        At this point Metamask is opened to sign for the transaction
        function waits for that transaction to be completed while console logging the progress
    */
     const submitVal = async (newBal) => {
       try {
         const { ethereum } = window;
   
         if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const FuckMyContract = new ethers.Contract(contractAddress, abiTest, signer);

           console.log("Initialize payment");
           //let Txn = await FuckMyContract.incrementVal({ value: ethers.utils.parseEther("0.01") }); - This is a payable function example
           let Txn = await FuckMyContract.updateBal(newBal);
  
           console.log("Mining... please wait");
           await Txn.wait();
   
           console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${Txn.hash}`);
   
         } else {
           console.log("Ethereum object does not exist");
         }
   
       } catch (err) {
         console.log(err);
       }
     }
 
     const PSM_Label = () => {
      return (
      <div className={'PSM-div'}>
        <h1> PSM 1 </h1>
        <p> Text example phrase here</p>
        <button onClick={retrieveInfoHandler} className={'PSM-button'}>
          {this.state.infoBtnMsg} 
        </button>
        <button onClick={retrieveInfoHandler} className={'PSM-button'}>
          Interact with this PSM
       </button>
      </div>
      )
    }

        /* Testing to see if there is alphabetical letters - deprecated since input field set to numbers only.
    * No need to use regExp anymore
    *      const regExp = /[a-zA-Z]/g;      
    *      if(regExp.test(this.state.mintNum)){
    *    //  do something if letters are found in your string 
    *      alert("Letters were found in your input.")
    *    } else {
    *      // do something if letters are not found in your string 
    *      alert("Numerical input correct")
    *      if(this.state.mintNum.includes(".")){
    *        alert(". found in the string");
    *      }
    */

  return(
       <div className='main-app'>
        <h1> Frontend for: </h1>
        <h5>  
          <p> <a href="https://rinkeby.etherscan.io/address/0x120813f3acf3ccb0eef3f93ad9ae8212a4d22f65" target="_blank">0x120813F3aCF3CCb0EEf3F93aD9aE8212A4D22f65</a></p>
          </h5>
        <p>|----------------------------------------------------------------------|</p>
         <h3>
             Connect your wallet.
         </h3>
         <div>   
           <p> Ensure you are connected to Rinkeby</p>
          {connectWalletButton()} 
         <p>|----------------------------------------------------------------------|</p>
          <h3> Check out your portfolio: </h3>
          {retrieveInfoButton()}
          <p> Your wallet's current balance: {this.state.availableBal} </p>
          <p> Your available balance to add to the wallet is: [Not implemented]</p>
         <p>|----------------------------------------------------------------------|</p>
         <h3> Interact with your position: </h3>
         <p> Lord help us all...this part needs work </p>
          <form classname='formClass' onSubmit={submitValHandler}>
            <label> Input new balance:

            <br></br> 

             <input 
                type="number" 
                value= {this.state.sNum}
                onChange={(e) => this.setState({sNum: e.target.value})}
               />
            </label>

            <br></br>
            <br></br>

            <label class="switch">
                 <input type="checkbox"
                  onChange={(e) => this.setState({wrapUnwrapToggle: !this.state.wrapUnwrapToggle})}
                 />
                 <span class="slider"></span>
              </label>

            <br></br>
            <br></br>
             <input 
             type="submit" 
             value= "help" //Run a function here to use the toggled logic and display a value
             />

           </form>
           <br />
            <small> Yes I am legit using basic characters like its from the 90s to organize the page. Its a V0.5 website. Besides I was told blockchainers can appreciate a simple straightforward website.
              I've got that here in spades. -Signed, Unpaid intern //Lead Dev</small>
         </div>
        {PSM_Label()}
       </div>
  )
   //}
   //{currentAccount ? incrValButton() : connectWalletButton()} - Just a note

} //End of Render Method
} //End of Class

export default DAPP;