 import React, { Component } from 'react'
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: '',
    };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); // PROVIDER from MetaMask 
    const players = await lottery.methods.getPlayers().call(); 
    const balance = await web3.eth.getBalance(lottery.options.address); // This is an OBJECT

    this.setState({ manager, players, balance });
  }

    // Form submissal
  onSubmit = async (event) => {
      event.preventDefault(); // prevent form from submitting itself

      const accounts = await web3.eth.getAccounts(); 

      this.setState({ message: 'Waiting on transaction success...'});

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });

      this.setState({ message: 'You have been entered! '});

  };

  onClick = async () => {
      const accounts = await web3.eth.getAccounts();
      
      this.setState({ message: 'Waiting on transaction success...' });

      await lottery.methods.pickWinner().send({
          from: accounts[0]
      }); 

      this.setState({ message: 'Winner has been picked!'});
  };

   render() {  
     return (
       <div>
           <h2> Lottery Contract </h2>
            <p> This contract is managed by: {this.state.manager}. </p>
            <p> There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether! </p>

            <hr/>

            <form onSubmit = {this.onSubmit}> 
                <h4> Want to try your luck? </h4>

                <div> 
                    <label> Amount of ether to enter </label>
                    <input 
                        value = {this.state.value}
                        onChange = {event => this.setState({ value: event.target.value })}
                    />
                </div>

                <button> Enter </button> 

            </form> 

                <hr />
                    <h4> Ready to pick a Winner? </h4> 
                    <button onClick = {this.onClick} >Pick a Winner!</button>
                <hr />

            <h2> {this.state.message} </h2>

       </div>
     )
   }
 }

 export default App; 
 