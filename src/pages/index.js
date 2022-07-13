import * as React from 'react';
import 'C:/Users/Testing/Fei_frontend_test/src/components/Navbar/Coconuts_Logo_test.png';

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
                <h1> Blah Blah DAO </h1>
                <h4> Providing Blah Blah Service  </h4>
                <h4> Please click on the "Enter DAPP" button in the top right to use our product. </h4>
            </div>
            <div style = {{
                textAlign: 'center',
                height: '50vh' //adjust how much scrolling is done here
                }}>
                    <p> I learned how to connect a frontend to the blockchain....</p>
                    <p> But I still haven't figured out how to make a bog-standard landing page.</p>
                    <p> Yes, this is literally going to be our V0.5 landing page for the first day or two. I dont care, I want to work on backend now.</p>
            </div>
       </>
    );
}

export default Home;