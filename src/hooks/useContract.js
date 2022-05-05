import { getContract } from '../utils/web3'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'

export function useContract(address, ABI, withSignerIfPossible) {
    const { library, account } = useWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useStakingContract(tokenStake, tokenReward) {
    const stakeContractDetails = getStakingContractDetails(tokenStake, tokenReward)

    return useContract(
        stakeContractDetails.address,
        stakeContractDetails.abi,
        true
    )
}

export function getStakingContractDetails(tokenStake, tokenReward) {
    if (tokenStake?.stake_contracts && tokenStake?.stake_contracts[tokenReward?.symbol]) {
        return tokenStake.stake_contracts[tokenReward.symbol]
    }
    return { address: null, abi: null }
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
export function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}
export function useMulticallContract() {
    const { chainId } = useWeb3React()
    return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}  