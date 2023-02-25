# frontend-test

I started this repo to store the code here just in case my laptop went up in smoke.

First things first: you may judge my code styling and my failure to program object orientatedly in certain areas but it somewhat works. 
Second thing: My wacko code commenting strategies work well for me but if it confuses you don't hesitate to contact me on discord. My DM's are open and I am in the Fei Protocol discord. Laser420#4066

If you have any ideas for more features and/or questions unrelated to code, contact Fishy#0007.


##### This repo contains the source files for the fei community frontend found on 'www.fei.lol'.

## Outline:

The first 'index.js' pages renders the 'app.js' page which in turn renders some React-router stuff. This router displays and manages the pages contained in ./src/pages.

#### Within ./src/pages:

'index.js' - the first landing page that the user sees.

'github.js' - a page that just redirects the user to this github repo.

'voting.js' - a page that redirects the user to the proper place to vote with their FEI.

'PSM_intro.js' - a page that shows the user the various PSMs and explains what a PSM is.

'FEI_DAI_PSM.js' - the bread and butter of the dApp, this is where the user actually does their minting and redeeming.
 
#### All pages within ./src/pages render the NavBar and the Footer. The NavBar allows for naviation between 'index.js' , "github.js', 'voting.js' and 'PSM_intro.js'. The code to these components is located within ./src/components. 
 
 #### Within ./src/pages is a location known as ./src/pages/contracts. This location holds all the .json abis of the various smart contracts that the frontend interacts with.


