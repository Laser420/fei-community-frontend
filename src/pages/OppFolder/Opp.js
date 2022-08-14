import React from 'react';
import { ethers } from 'ethers';
import './Opp.css';

import FEI_USD_ABI from '../contracts/FEI_USD_ABI.json'; //FEI ERC20 token ABI

const FEI_DAI_PSM_ADD = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2"; // FEI-DAI PSM address

const FEI_USD_ADD = "0x956F47F50A910163D8BF957Cf5846D573E7f87CA"; // FEI ERC20 address
const FEI_USD_ABI_PRS = JSON.parse(JSON.stringify(FEI_USD_ABI)); // Parse the FEI ERC20 ABI

class Opp extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      walletConnected: false, // boolean determining if a wallet is connected
      wbtnMsg: "Check/Connect Wallet", // Connect wallet button msg
      walletBtnClass: 'cta-button connect-wallet-button', // CSS class for Connect Wallet Button

      zapNum: 0, // the number of FEI we want to zap

      FallowanceNum: 0, // the amount of FEI that is approved

      unZapNum: 0, //the number of the receipt token we want to unzap back into FEI

      RallowanceNum: 0, //the amount of the user's receipt token that is approved
    
    };
  }


render() {
 // console.log(typeof(abiTest))

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
        this.setState({wbtnMsg : "[" + (await provider.getNetwork()).name + "] " + accounts[0]});
        this.setState({walletBtnClass: 'cta-button wallet-connected-button'});
        this.setState({walletConnected: true});
        //Catch errors
      } catch (err) {
        this.state.status = "Err";
        console.log(err)
      }
      {Fei_Balance_Checker()} // Check the connected wallet's FEI balance
      {checkFEIApproval()} //Check the connected wallet's FEI approval to the opportunity contract
      {Receipt_Balance_Checker()} //Check the connected wallet's receipt balance
      {checkReceiptTknApproval()} //Check the connected wallet's receiptTkn approval status of the unzap contract
    }
   

    //ZAP functions...

    /* Checks the connected wallet's balance of FEI - sets this balance as zapNum */
    const Fei_Balance_Checker = async () => {
      if(this.state.walletConnected === true) {

      const { ethereum } = window; 

      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const contractObject = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, provider);
      const result = await contractObject.balanceOf(accounts[0]);
      const resultStr = result.toString();
     // console.log(resultStr);
      
      //Take our result and make it legible with two decimal points
      const lengthNonD = resultStr.length - 18;
      const nonDecimal = resultStr.substring(0, lengthNonD);
      
      const lengthOfD = resultStr.length - 16;
      const decimal = resultStr.substring(lengthNonD, lengthOfD);
  
      const returnStr = nonDecimal + "." + decimal;
  
      this.setState({zapNum : returnStr}); // display the amount of FEI we have as zapNum
      //This balance is used in the redeem value to show how much DAI can be redeemed
   } else if (this.state.walletConnected === false) {
    //console.log("Wallet not connected.")
   }
    }

    //Checks the current amount of FEI approved by the user for interacting with the zap contract address set by the parent
    //Sets this value to FallowanceNum
    //Called by the connectwallet handler
    const checkFEIApproval  = async () => {
    if(this.state.walletConnected === true) {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const contractObject = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, provider);
    //Find the FEI allowance of the user for the zapADD
    const result = await contractObject.allowance(accounts[0], this.props.zapADD);
    const resultStr = result.toString();
   // console.log(resultStr);
    //Take our result and make it legible with two decimal points
    const lengthNonD = resultStr.length - 18;
    const nonDecimal = resultStr.substring(0, lengthNonD);
    const lengthOfD = resultStr.length - 16;
    const decimal = resultStr.substring(lengthNonD, lengthOfD);
    const returnStr = nonDecimal + "." + decimal;
    this.setState({FallowanceNum : returnStr}); // //How much FEI is approved for us at this address
    //This balance is used in the redeem value to show how much DAI can be redeemed
 } else if (this.state.walletConnected === false) {
 // console.log("Wallet not connected.")
 }
    }

  
  const approveZapHandler = async () => {
    let inputStr = this.state.zapNum;

    if(this.state.zapNum.includes(".")){
      const mintNumSplitArray = this.state.zapNum.split("."); // First split our value into two strings at the decimal
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
         const FEI_CONT = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, signer); //FEI contract initialized
          console.log("Initialize approval");
          //approve the zap contract 
          let Txn = await FEI_CONT.approve(this.props.zapADD, inputStr);     
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
      const str = this.state.zapNum;
      inputStr = str + "000000000000000000" 

      try {
        const { ethereum } = window;
        if (ethereum) {
         const provider = new ethers.providers.Web3Provider(ethereum);
         const signer = provider.getSigner();
         const FEI_CONT = new ethers.Contract(FEI_USD_ADD, FEI_USD_ABI_PRS, signer);
          console.log("Initialize approval");
          //approve the FEI-DAI_PSM to use 
          let Txn = await FEI_CONT.approve(this.props.zapADD, inputStr); 
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

    //Execute the zap function 
    const executeZapHandler = async () => {
      let inputStr = this.state.zapNum;
  
      if(this.state.zapNum.includes(".")){
        const mintNumSplitArray = this.state.zapNum.split("."); // First split our value into two strings at the decimal
        const wholeNum = mintNumSplitArray[0]; // the whole number is simply the part before the decimal point
        let decimals = mintNumSplitArray[1]; // the decimals are the numbers after the decimal point
        for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
            decimals = decimals + "0";
        }
        inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added

      //set up an array that is the same as the args array from the parent
      //this array is what we will pass as the arguments for the call
      //This is our entry call so we use argsEnter
      const args = this.props.argsEnter; 
      //Not every contract has the same arguments in the same place, but every contract needs to know how much FEI the user wants to input
      //The parent sets what index of the argument array needs to be replaced with user input....
      //here we actually set our inputStr (the decimal-prepped user input) to be at that index
      args[this.props.indexOfInputEnter] = inputStr;
      console.log(args);

        try {
          const { ethereum } = window;
          if (ethereum) {
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
           const ZAP_CONT = new ethers.Contract(this.props.zapADD, this.props.zapABI, signer); //FEI contract initialized
            console.log("Initialize " + this.props.enterCall);
            //this.props.enterCall is set by the parent to be whatever call this Opp uses to enter the opportunity
            //'...args' uses the ES6 spread operator to spread the values of the args array as parameters for the contract call
            let Txn = await ZAP_CONT[this.props.enterCall](...args);     
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
        const str = this.state.zapNum;
        inputStr = str + "000000000000000000" 

        //set up an array that is the same as the args array from the parent
        //this array is what we will pass as the arguments for the call
        //This is our entry call so we use argsEnter
        const args = this.props.argsEnter; 
        //Not every contract has the same arguments in the same place, but every contract needs to know how much FEI the user wants to input
        //The parent sets what index of the argument array needs to be replaced with user input....
        //here we actually set our inputStr (the decimal-prepped user input) to be at that index
        args[this.props.indexOfInputEnter] = inputStr;
        console.log(args);

        try {
          const { ethereum } = window;
          if (ethereum) {
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
           const ZAP_CONT = new ethers.Contract(this.props.zapADD, this.props.zapABI, signer);
            console.log("Initialize " + this.props.enterCall);
            //this.props.enterCall is set by the parent to be whatever call this Opp uses to enter the opportunity
            //'...args' uses the ES6 spread operator to spread the values of the args array as parameters for the contract call
            let Txn = await ZAP_CONT[this.props.enterCall](...args);  
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


  const zapHandler = () => {
        alert("Testing shit")
       //If the allowance is >= the minting num
       if(this.state.FallowanceNum >= this.state.zapNum){
            {executeZapHandler()}
         } else { //If the allowanceNum is less than the mintNum
            {approveZapHandler()}
      //edit this handler to find exactly how much needs to be approved
         }
  }

  //Function that opens the link to the opportunity's website
    const OpportunitySiteHandler = () => {
      window.open(this.props.link);
  }


  //Purely cosmetic fix on what the buttons say...not what the buttons do.
  const approveOrZap = () => {
    if(this.state.FallowanceNum >= this.state.zapNum){ 
      return "Zap " + this.state.zapNum + " FEI.";
      
    } else { 
        return "Please approve the use of " + this.state.zapNum + " FEI ";
        
    }
  }
  
  //ZAP functions end

  //Unzap functions begin:

      
    //Check the balance of the user's receipt tokens, present the user with how much they can unzap
    //balanceOf called from receipt ERC20 contract initialized with 'receiptADD' & 'receiptABI'
    //sets returned value to unZapNum
      const Receipt_Balance_Checker = async () => {
        if(this.state.walletConnected === true) {
  
        const { ethereum } = window; 
  
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        //check the balanceOf the user at the receipt contract address with its ABI;
        const contractObject = new ethers.Contract(this.props.receiptADD, this.props.receiptABI, provider);
        const result = await contractObject.balanceOf(accounts[0]);
        const resultStr = result.toString();
       // console.log(resultStr);
        
        //Take our result and make it legible with two decimal points
        const lengthNonD = resultStr.length - 18;
        const nonDecimal = resultStr.substring(0, lengthNonD);
        
        const lengthOfD = resultStr.length - 16;
        const decimal = resultStr.substring(lengthNonD, lengthOfD);
    
        const returnStr = nonDecimal + "." + decimal;
    
        this.setState({unZapNum : returnStr}); // display the amount of FEI we have as zapNum
        //This balance is used in the redeem value to show how much DAI can be redeemed
     } else if (this.state.walletConnected === false) {
      //console.log("Wallet not connected.")
     }
      }
  
      //Checks the current amount of the receipt token approved by the user for interacting with the unZap contract address set by the parent
      //initializez contract with 'receiptADD' and 'receiptABI' 
      //calls allowance check of the user's allowance for the 'unZapADD' 
      //Got to be able to access the Receipt ERC20 in order to send it back and get the FEI
      //Sets returned value to RallowanceNum
      const checkReceiptTknApproval  = async () => {
      if(this.state.walletConnected === true) {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const contractObject = new ethers.Contract(this.props.receiptADD , this.props.receiptABI, provider);
      //Find the FEI allowance of the user for the zapADD
      const result = await contractObject.allowance(accounts[0], this.props.unZapADD);
      const resultStr = result.toString();
     // console.log(resultStr);
      //Take our result and make it legible with two decimal points
      const lengthNonD = resultStr.length - 18;
      const nonDecimal = resultStr.substring(0, lengthNonD);
      const lengthOfD = resultStr.length - 16;
      const decimal = resultStr.substring(lengthNonD, lengthOfD);
      const returnStr = nonDecimal + "." + decimal;
      this.setState({RallowanceNum : returnStr}); // //How much FEI is approved for us at this address
      //This balance is used in the redeem value to show how much DAI can be redeemed
   } else if (this.state.walletConnected === false) {
   // console.log("Wallet not connected.")
   }
  }
  
    //Sends an approval transaction to the receipt token ERC20 to approve the UnZap contract
    //Again the Unzap contract might be the same as the zap contract, but in a more complicated system it might not be
    //this leaves the options open
    //Initializes a contract with 'receiptADD' and 'receiptABI'
    //Calls approve with the 'unZapADD' and the user input as the arguments
    const approveUnZapHandler = async () => {
      let inputStr = this.state.unZapNum;
  
      if(this.state.unZapNum.includes(".")){
        const mintNumSplitArray = this.state.unZapNum.split("."); // First split our value into two strings at the decimal
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
           const R_CONT = new ethers.Contract(this.props.receiptADD, this.props.receiptABI, signer); //FEI contract initialized
            console.log("Initialize approval");
            //approve the zap contract 
            let Txn = await R_CONT.approve(this.props.unZapADD, inputStr);     
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
        const str = this.state.unZapNum;
        inputStr = str + "000000000000000000" 
  
        try {
          const { ethereum } = window;
          if (ethereum) {
           const provider = new ethers.providers.Web3Provider(ethereum);
           const signer = provider.getSigner();
           const R_CONT = new ethers.Contract(this.props.receiptADD, this.props.receiptABI, signer); //FEI contract initialized
            console.log("Initialize approval");
            //approve the zap contract 
            let Txn = await R_CONT.approve(this.props.unZapADD, inputStr);     
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
  

      //Execute the unZap function
      //Initializes a contract with the 'unZapADD' and 'unZapABI'
      //Calls the 'exitCall' function on that contract, passing through the 'argsExit'
      const executeUnZapHandler = async () => {
        let inputStr = this.state.unZapNum;
    
        if(this.state.unZapNum.includes(".")){
          const mintNumSplitArray = this.state.unZapNum.split("."); // First split our value into two strings at the decimal
          const wholeNum = mintNumSplitArray[0]; // the whole number is simply the part before the decimal point
          let decimals = mintNumSplitArray[1]; // the decimals are the numbers after the decimal point
          for(let i = 0; decimals.length < 18 ; i ++){ //If the current decimals are less than 18, add a zero - create an 18 digit long number
              decimals = decimals + "0";
          }
          inputStr = wholeNum + decimals; // set the final input to be the wholeNumber and the decimals added
  
        //set up an array that is the same as the args array from the parent
        //this array is what we will pass as the arguments for the call
        //This is our exit call so we use argsExit - to leave the opportunity
        const args = this.props.argsExit; 
        //set where in the arguments the user input goes
        args[this.props.indexOfInputExit] = inputStr;
        console.log(args);
  
          try {
            const { ethereum } = window;
            if (ethereum) {
             const provider = new ethers.providers.Web3Provider(ethereum);
             const signer = provider.getSigner();
             const unZAP_CONT = new ethers.Contract(this.props.unZapADD, this.props.unZapABI, signer); //FEI contract initialized
              console.log("Initialize " + this.props.exitCall);
              //this.props.exitCall is set by the parent to be whatever call this Opp uses to exit the opportunity
              //'...args' uses the ES6 spread operator to spread the values of the args array as parameters for the contract call
              let Txn = await unZAP_CONT[this.props.exitCall](...args);     
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
          const str = this.state.unZapNum;
          inputStr = str + "000000000000000000" 
  
          //set up an array that is the same as the args array from the parent
          //this array is what we will pass as the arguments for the call
          //This is our exit call so we use argsExit
          const args = this.props.argsExit; 
          //set where in the arguments the user input goes
          args[this.props.indexOfInputExit] = inputStr;
          console.log(args);
  
          try {
            const { ethereum } = window;
            if (ethereum) {
             const provider = new ethers.providers.Web3Provider(ethereum);
             const signer = provider.getSigner();
             const ZAP_CONT = new ethers.Contract(this.props.unZapADD, this.props.unZapABI, signer);
              console.log("Initialize " + this.props.exitCall);
              //this.props.enterCall is set by the parent to be whatever call this Opp uses to enter the opportunity
              //'...args' uses the ES6 spread operator to spread the values of the args array as parameters for the contract call
              let Txn = await ZAP_CONT[this.props.exitCall](...args);  
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
  
  
      //Checks whether or not we need to approve the UnZap or if we need to just go ahead
    const unZapHandler = () => {
        
         //If the receipt allowance is >= the amount of receiptTokens we have
         if(this.state.RallowanceNum >= this.state.unZapNum){
              {executeUnZapHandler()}
           } else { //If the allowanceNum is less than the amount of receipt tokens
              {approveUnZapHandler()}
           }
    }
  
  
    //Purely cosmetic fix on what the buttons say...not what the buttons do.
    const approveOrUnZap = () => {
      if(this.state.RallowanceNum >= this.state.zapNum){ 
        return "UnZap " + this.state.unZapNum + " FEI.";
        
      } else { 
          return "Please approve the use of " + this.state.unZapNum + " receipt tokens. ";
          
      }
    }
    




    //PSM Label
    const OpportunityLabel = () => {
        return (
        <div className="Opp-div">
         
         <div style={{
           display: 'flex',
           justifyContent: 'left',
           alignItems: 'center',
           flexwrap: 'wrap',
           gap: '400px',
           height: '10vh',
          }} >
             <h2> {this.props.name} </h2>
            {connectWalletButton()}
          </div>
        
          <p> {this.props.desc} </p>
          <p> {this.props.riskReport}</p>
          
          <div style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '20vh',
          }} >
          <button onClick={OpportunitySiteHandler} className={'Opp-button'}>
            Visit Opportunity Site
          </button>
          </div>

         <div style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           flexwrap: 'wrap',
           gap: '200px',
           height: '40vh',
          }} >
    
          <form classname='formClass' onSubmit={zapHandler}>
            <h3> Zap Into Opportunity: </h3>
            <label> How much shit are you Zapping? </label>
           
            <br></br>
             <input 
                type="number" 
                value= {this.state.zapNum}
                onChange={(e) => this.setState({zapNum: e.target.value})}
               />
            <br></br>
         
            <input 
             type="submit" 
             value= {approveOrZap()}
             />
         
           </form>
         
          
          <form classname='formClass' onSubmit={unZapHandler}>
          <h3> UnZap From Opportunity: </h3>
            <label> How much shit are you UnZapping? </label>
           
            <br></br>
             <input 
                type="number" 
                value= {this.state.unZapNum}
                onChange={(e) => this.setState({unZapNum: e.target.value})}
               />
            <br></br>
         
            <input 
             type="submit" 
             value= {approveOrUnZap()}
             />
         
           </form>
          </div>
        </div>
        )
      }


    return(
      <div>
         {OpportunityLabel()}
      </div>
    
    )

  } //End of Render Method
} //End of Class


export default Opp;