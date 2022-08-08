import * as React from 'react';

const Home = () => {
    return(
        <>
        <div style = {{
           //  display: 'flex',
           // justifyContent: 'space-evenly', 
           // alignItems: 'center',
           textAlign: 'center',
           height: '40vh' //adjust how much scrolling is done here
           }}>
           <h1> Fei Community Frontend </h1>
           <h4> Providing the Fei DAO with a frontend UI </h4>
           <h4> Click the "Enter dApp" button on the top right to use the PSM. </h4>
       </div>
       <div style = {{
           textAlign: 'center',
           height: '40vh' //adjust how much scrolling is done here
           }}>
               <p> This is an experimental frontend. Please only interact with funds you can afford to lose. </p>
               <p> Future Plans: Opportunities page with zap functionality, more </p>
               <p> Coded by Laser420, Research and Composition by Fishy </p>
       </div>
  </>
    );
}

export default Home;