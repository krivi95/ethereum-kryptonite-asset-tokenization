// ReactJS components
import React, { Component } from "react";

// Ethereum contracts
import KryptoniteToken from "./contracts/KryptoniteToken.json";
import KryptoniteTokenSale from "./contracts/KryptoniteTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";
import getWeb3 from "./getWeb3";

// Local ReactJs components
import HomepageScreen from "./screens/HomepageScreen"

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3Loaded: false
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      //Getting the ethereum network id (Mainnet, Testnet, Ropsten, ...)
      this.networkId = await this.web3.eth.net.getId();

      this.kryptoniteToken = new this.web3.eth.Contract(
        KryptoniteToken.abi,
        KryptoniteToken.networks[this.networkId] && KryptoniteToken.networks[this.networkId].address
      );

      this.kryptoniteTokenSale = new this.web3.eth.Contract(
        KryptoniteTokenSale.abi,
        KryptoniteToken.networks[this.networkId] && KryptoniteToken.networks[this.networkId].address
      );

      this.kycContract = new this.web3.eth.Contract(
        KYCContract.abi,
        KYCContract.networks[this.networkId] && KYCContract.networks[this.networkId].address
      );

      // Loading is finished
      this.setState({
        web3Loaded: true
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3Loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <HomepageScreen/>
      </div>
    );
  }
}

export default App;
