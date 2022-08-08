import React from 'react';
import './PSM_Intro.css';
import FEI_LUSD_PSM_ABI from './contracts/FEI_LUSD_PSM.json';
import FEI_ETH_PSM_ABI from './contracts/FEI_ETH_PSM.json';
import FEI_DAI_PSM_ABI from './contracts/FEI_DAI_PSM.json';
import { ethers } from 'ethers';

const FEI_LUSD_PSM_Add = "0xb0e731F036AdfDeC12da77c15aaB0F90E8e45A0e";
const FEI_ETH_PSM_Add = "0x98E5F5706897074a4664DD3a32eB80242d6E694B";
const FEI_DAI_PSM_Add = "0x2A188F9EB761F70ECEa083bA6c2A40145078dfc2"

//To change this from rinkeby to mainnet, simply make it:
//https://mainnet.infura.io/v3/de52a3f3a7814cc89479216cb97eb69a
//This is the link to my Infura project
const RPC = "https://mainnet.infura.io/v3/de52a3f3a7814cc89479216cb97eb69a";

const FEI_LUSD_PSM_ABI_PRS = JSON.parse(JSON.stringify(FEI_LUSD_PSM_ABI)); //This worked, parsed the stringified ABI manually
const FEI_ETH_PSM_ABI_PRS = JSON.parse(JSON.stringify(FEI_ETH_PSM_ABI)); //This worked, parsed the stringified ABI manually
const FEI_DAI_PSM_ABI_PRS = JSON.parse(JSON.stringify(FEI_DAI_PSM_ABI)); //This worked, parsed the stringified ABI manually

class PSM_Intro extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      temp: "button not clicked",

      isPausedPSM1: "",
      PSM_1_Active: true,

      isPausedPSM2: "",
      PSM_2_Active: true,

      isPausedPSM3: "",
      PSM_3_Active: true,
    };
   

  }
          //Retrive the status of the LUSD PSM
        retrievePsmStatus1 = async () => {
            //Use an RPC provider to read status so the user doesn't need to connect a wallet
            //This current method requires an Infura project, if neccessary we can simply use
            // "new ethers.providers.InfuraProvider("homestead") and simply use Infura without defining ourselves
            const provider = new ethers.providers.JsonRpcProvider(RPC)
            const contractObject = new ethers.Contract(FEI_LUSD_PSM_Add, FEI_LUSD_PSM_ABI_PRS, provider);
            const result = await contractObject.paused();
            console.log(result);
            if (result === true) // If the PSM paused value is true, set the status to say the PSM is paused
            {
              this.setState({isPausedPSM1: "paused, you cannot interact with it."})
              this.setState({PSM_1_Active: false})
            }
            else if (result === false) //If the PSM paused value is false, set the status to say the PSM can be interacted with
            {
              this.setState({isPausedPSM1: "active, you can interact with it."})
              this.setState({PSM_1_Active: true})
            }
        }

        //Retrive the status of the DAI PSM
        retrievePsmStatus2 = async () => {
        //Use an RPC provider to read status so the user doesn't need to connect a wallet
        //This current method requires an Infura project, if neccessary we can simply use
        // "new ethers.providers.InfuraProvider("homestead") and simply use Infura without defining ourselves
        const provider = new ethers.providers.JsonRpcProvider(RPC)
        const contractObject = new ethers.Contract(FEI_DAI_PSM_Add, FEI_DAI_PSM_ABI_PRS, provider);
        const result = await contractObject.paused();
        console.log(result);
        if (result === true) // If the PSM paused value is true, set the status to say the PSM is paused
        {
          this.setState({isPausedPSM2: "paused, you cannot interact with it."})
          this.setState({PSM_2_Active: false})
        }
        else if (result === false) //If the PSM paused value is false, set the status to say the PSM can be interacted with
        {
          this.setState({isPausedPSM2: "active, you can interact with it."})
          this.setState({PSM_2_Active: true})
        }
        }


        //Retrive the status of the ETH PSM
        retrievePsmStatus3 = async () => {
        //Use an RPC provider to read status so the user doesn't need to connect a wallet
        //This current method requires an Infura project, if neccessary we can simply use
        // "new ethers.providers.InfuraProvider("homestead") and simply use Infura without defining ourselves
        const provider = new ethers.providers.JsonRpcProvider(RPC)
        const contractObject = new ethers.Contract(FEI_ETH_PSM_Add, FEI_ETH_PSM_ABI_PRS, provider);
        const result = await contractObject.paused();
        console.log(result);
        if (result === true) // If the PSM paused value is true, set the status to say the PSM is paused
        {
        this.setState({isPausedPSM3: "paused, you cannot interact with it."})
        this.setState({PSM_3_Active: false})
        }
        else if (result === false) //If the PSM paused value is false, set the status to say the PSM can be interacted with
        {
        this.setState({isPausedPSM3: "active, you can interact with it."})
        this.setState({PSM_3_Active: true})
        }
        }

  //When the page loads, run these three functions
  componentDidMount() {
   this.retrievePsmStatus1();
   this.retrievePsmStatus2();
   this.retrievePsmStatus3();
}

render() {

  const PSM_1_Button_Handler = () => {
    alert("This PSM was recently deprecated.");
  }

  const PSM_2_Button_Handler = () => {
   //Need to put the hash before the DAPP route 
    window.location.replace('/#/FEI_DAI_PSM');
  }


  const PSM_3_Button_Handler = () => {
    alert("This PSM was recently deprecated.");
  }

  //LUSD PSM
  const PSM_Label_1 = () => {
      return (
      <div className='PSM-div'>
        <h2> LUSD-FEI PSM </h2>
        <p> This PSM exchanges LUSD and FEI.</p>
        <h4> This PSM is {this.state.isPausedPSM1} </h4>
       
        <button onClick={PSM_1_Button_Handler} className={'PSM-button'}>
          Go to PSM
       </button>
      </div>
      )
    }

    //DAI PSM
    const PSM_Label_2 = () => {
      return (
      <div className='PSM-div'>
        <h2> DAI-FEI PSM  </h2>
        <p> This PSM exchanges DAI and FEI.</p>
        <h4> This PSM is {this.state.isPausedPSM2} </h4>
       
        <button onClick={PSM_2_Button_Handler} className={'PSM-button'}>
          Go to PSM
       </button>
      </div>
      )
    }

    //ETH PSM
    const PSM_Label_3 = () => {
      return (
      <div className='PSM-div'>
        <h2> ETH-FEI PSM  </h2>
        <p> This PSM exchanges ETH and FEI. </p>
        <h4> This PSM is {this.state.isPausedPSM3} </h4>
       
        <button onClick={PSM_3_Button_Handler} className={'PSM-button'}>
          Go to PSM
       </button>
      </div>
      )
    }

    

  return(

    <div className='main-app'>
     <h1> Choose your Peg-Stability-Module (PSM): </h1>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
    }} >
    {PSM_Label_1()}
    {PSM_Label_2()}
    {PSM_Label_3()}
    </div>
    <h3> What is a PSM? </h3>
    <p> PSMs (Peg Stability Modules) help FEI maintain liquidity and stability with other assets such as ETH and DAI. FEI's PSM with DAI helps it maintain a tight peg to the USD while reducing decentralization less than a direct USDC peg.</p>
    <p> The other PSM options are paused and in the process of being deprecated. We still decided to include them in the frontend, just in case of reactivation.</p>
    </div>
  )


} //End of Render Method
} //End of Class

export default PSM_Intro;