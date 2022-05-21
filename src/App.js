import './App.css';
import Navbar from './Components/Navbar';
import AllProjects from './Components/AllProjects';
import { Route, Routes } from 'react-router-dom';
import ProjectDetail from './Components/ProjectDetail';
import Bottomnav from './Components/Bottomnav';
import PostNew from './Components/PostNew';
import Assigned from './Components/Assigned';
import Register from './Components/Register';
import Posted from './Components/Posted';
import AssignedProject from './Components/AssignedProject';
import MyProjectDetails from './Components/MyProjectDetails';
import { getAddress, init } from "./web3/Web3Client";
import { useEffect, useState, useLayoutEffect } from 'react';

function App() {
  const [address, setAddress] = useState()
  useLayoutEffect(async() => {
    connectMM()
    switchEthereumChain()
  }, [])

  const switchEthereumChain = async() => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }],
      });
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x61',
                chainName: 'BSC Testnet',
                nativeCurrency: {
                  name: 'Binance',
                  symbol: 'BNB', // 2-6 characters long
                  decimals: 18
                },
                blockExplorerUrls: ['https://testnet.bscscan.com'],
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      // console.error(e)
    }
  }

  const connectMM = async () => {
    try {
      const web3 = await init();
      const walletAddress = await web3.eth.getAccounts()
      // await window.ethereum.enable();
      // const Address = await window.ethereum.selectedAddress
      setAddress(walletAddress[0])
      console.log("address", walletAddress)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <Navbar connect={connectMM} add={address} />
      <Bottomnav  connect={connectMM} add={address} />
      <div className='globalContainer'>
        <Routes>
          <Route path='/' element={<AllProjects />} />
          <Route path='/register' element={<Register />} />
          <Route path='/myassignments' element={<Assigned add={address} />} />
          <Route path='/myassignments/assigned' element={<AssignedProject />} />
          <Route path='/createpost' element={<PostNew add={address} />} />
          <Route path='/myprojects' element={<Posted add={address} />} />
          <Route path='/myprojects/:id' element={<MyProjectDetails add={address} />} />
          <Route path='/project/:id' element={<ProjectDetail add={address} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
