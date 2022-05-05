import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const SUPPORTED_CHAINIDS = [
    // 56,
    80001
]

export const injected = new InjectedConnector({})

//MAINNET
/*
export const walletconnect = new WalletConnectConnector({
    rpc: {
        56: 'https://bsc-dataseed.binance.org/'
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
});
*/
//TESTNET
export const walletconnect = new WalletConnectConnector({
    rpc: {
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545'
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
});
