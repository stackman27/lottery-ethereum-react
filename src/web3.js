import Web3 from 'web3';

const getProvider = async () => {
    await window.web3.currentProvider.enable(); // request authentication
};

getProvider();

/*  PROVIDER CALL
 *  #WINDOW & WEB3# is reference to global variable coming straight from MetaMask  
 *  #CURRENTPROVIDER# is the copy given to the web3 MetaMask to connect to Rinkeby
*/
const web3 = new Web3(window.web3.currentProvider);  

export default web3; 
