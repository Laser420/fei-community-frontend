import React from 'react';
import { ethers } from 'ethers';
import './Opp.css';



class Opp extends React.Component {
 constructor(props) {
    super(props);
    this.state = {

    
    };
  }


render() {
  console.log(typeof(abiTest))

    const OpportunityHandler = () => {
        alert("Testing shit")
    }

    const OpportunitySiteHandler = () => {
      window.open(this.props.link);
  }

    //PSM Label
    const OpportunityLabel = () => {
        return (
        <div className="Opp-div">
          <h2> {this.props.name} </h2>
          <p> {this.props.desc} </p>

          {console.log(this.props.abiFEI)}
          {console.log(this.props.addressFEI)}
          

         <div style={{
           display: 'flex',
           justifyContent: 'right',
           alignItems: 'center',
           flexwrap: 'wrap',
           gap: '30px',
           height: '20vh',
          }} >
          
          <button onClick={OpportunitySiteHandler} className={'Opp-button'}>
            Visit Opportunity Site
          </button>
      
          <form classname='formClass' onSubmit={OpportunityHandler}>
            <label> How much shit are you zapping?
            <br></br>
             <input 
                type="number" 
                value= {this.state.mintNum}
                onChange={(e) => this.setState({mintNum: e.target.value})}
               />
            </label>
            <br></br>
            <input 
             type="submit" 
             value= "Submit this bitch" 
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