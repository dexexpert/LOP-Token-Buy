import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './constants'
// import { Provider } from 'react-redux'
// import getLibrary from './utils/getLibrary'
// import store from './state'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers = ({ children }) => {
  return (
    // <Provider store={store}>
      {children}
    // </Provider>
  )
}

export default Providers
