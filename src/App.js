import './App.css'

import Header from './containers/Header'
import { InlineFooter } from './containers/Footer'
import React, {useState} from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import Routes from './containers/routes'
import WalletModal from './containers/WalletModal'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import WrongNetworkModal from './containers/WrongNetworkModal'
import configureStore from './state'
import "react-pro-sidebar/dist/css/styles.css";
import Particles from "./containers/Particles"

import Aside from "./containers/Aside";
import { FaBars } from "react-icons/fa";



function getLibrary(provider) {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

const reduxStore = configureStore()



function Modals() {
  return <>
    <WalletModal />
    <WrongNetworkModal />
  </>
}

function App() {

  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const styles = {
    root: {
      fontFamily: "sans-serif",
      textAlign: "center",
      height: "100vh",
      background: "#162a43",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: "0px",
      // left: "0"
    }
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ReduxProvider store={reduxStore}>
        <div style={styles.root} >
          <Particles />
        </div>
        <div className="App flex flex-col" style={{height: "100%", overflow: "hidden"}}>
          {/* <PurpleRadial className="Radials" />
          <GreenRadial className="Radials" /> */}
            <div className=" top-5 left-10 z-10 h-full fixed">
              {/* <Header /> */}
              <div
                onClick={() => handleToggleSidebar(true)}
              >
              <FaBars size="1.5em" color="#35caa9"/>
              </div>
            </div>
            <Aside 
               rtl={rtl}
               toggled={toggled}
               handleToggleSidebar={handleToggleSidebar}
            />
          </div>
          <div
            className="flex-grow relative flex flex-col items-center px-5 py-3 content"
            style={{ marginLeft: "270px" ,height: "100%"}}
          >

            <Routes />

          </div>
          <div className=" top-7 z-10 absolute right-0 wallet">
            <InlineFooter />
          </div>
          <Modals />
        </ReduxProvider>
    </Web3ReactProvider>
  )
}

export default App
