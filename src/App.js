import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  console.log("detectamos el provider");
  const provider = window.ethereum;// see "Detecting the Provider"
  console.log("provider:",provider);
  
  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://polygonscan.com'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
  };
  
  async function testingphantom () {
    console.log("testeamos conectar con el provider");
    try {
      const accounts = await provider.request({ method: "eth_requestAccounts", params:[quicknodeRPCConfig] });
      console.log("cuenta obtenida del provider",accounts[0]);
      changechain(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  async function changechain (account) {
    console.log("cambiamos a testnet");
    try {
      const changechainid = await provider.request({ method: "wallet_addEthereumChain", params:[quicknodeRPCConfig] });
      testingtx(account,changechainid);
    } catch (err) {
      console.log(err)
    }
  }

  async function testingtx (account,changechainid) {
    console.log("cuenta=>",account);
    console.log("chaindata=>",changechainid);
    const result = await provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account,
          to: '0x0000000000000000000000000000000000000000',
          value: '0x0',
          gasLimit: '0x5028',
          gasPrice: '0x2540be400',
          type: '0x0',
        },
      ],
    });

    console.log(result);
  }
  
  testingphantom();

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          Mint and Verify NFT
        </p>
      </header>
    </div>
  );
}

export default App;
