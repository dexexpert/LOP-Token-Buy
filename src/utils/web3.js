import { BigNumber, ethers } from 'ethers'

import { AddressZero } from '@ethersproject/constants'
import BEP20_ABI from '../assets/contracts/bep20_abi.json'
import { Contract } from '@ethersproject/contracts'
import LP_ABI from '../assets/contracts/pcslp_abi.json'
import { SUPPORTED_CHAINIDS } from '../constants/web3'
import { getAddress } from '@ethersproject/address'
import { getStakingContractDetails } from '../hooks/useContract'
import { toFloat } from './number'

export const isRightNetwork = (chainId) => {
  return SUPPORTED_CHAINIDS.includes(chainId)
}

export function isAddress(value) {
  try {
      return getAddress(value)
  } catch {
      return false
  }
}
export function isAddressString(value) {
  try {
      return getAddress(value)
  } catch {
      return ''
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

export async function getBalance(address, token, library) {
  try {
    if(!isAddress(token) || token === AddressZero) {
      return await library.getBalance(address)
    }
    const contract = getContract(token, BEP20_ABI, library)
    return await contract.balanceOf(address)
  } catch(e) { console.log(e) }
  return 0
}

export async function getPrice(lp, decimals, library, pair_flipped) {
  try {
    const contract = getContract(lp, LP_ABI, library)
    const { _reserve0, _reserve1 } = await contract.getReserves()
    let firstToken = formatBalance(_reserve0, decimals)
    let secondToken = formatBalance(_reserve1)
    if (pair_flipped) {
        firstToken = formatBalance(_reserve0)
        secondToken = formatBalance(_reserve1, decimals)
        return toFloat(firstToken) / toFloat(secondToken);
    }
    return toFloat(secondToken) / toFloat(firstToken)
  } catch(e) { console.log(e) }
  return 0
}

export async function getAllowance(address, spender, token, library) {
  try {
    if(!isAddress(token) || token === AddressZero) {
      throw Error(`Invalid 'token' parameter '${token}'.`)
    }
    const contract = getContract(token, BEP20_ABI, library)
    return await contract.allowance(address, spender)
  } catch(e) { console.log(e) }
  return 0
}

export async function getStakeAllowance(account, tokenStake, tokenReward, library) {
  try {
    const { details } = getStakeContract(tokenStake, tokenReward, library)
    const contract = getContract(tokenStake.address, BEP20_ABI, library)
    return await contract.allowance(account, details.address)
  } catch (e) { console.log(e) }
  return 0
}

export async function getDepositAllowance(account, tokenStake, tokenReward, library) {
  try {
    const { details } = getStakeContract(tokenStake, tokenReward, library)
    const contract = getContract(tokenReward.address, BEP20_ABI, library)
    return await contract.allowance(account, details.address)
  } catch (e) { console.log(e) }
  return 0
}

export async function getStaked(account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(details.legacy_stake)
      return await contract._addressStakedSafePanda(account)
    return await contract.currentStake(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getEarned (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(details.legacy_stake)
      return await contract._currentRewards(account)
    return await contract.currentRewards(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getStakable (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(details.legacy_stake)
      return await contract._maxStakeAmount()
    return await contract.maxStakeAmount(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getShare (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(details.legacy_stake)
      return await contract._percentageOfStakePoolNewStake(0)
    return await contract.percentageOfStakePool(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getIsTimeLocked (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(!details.time_lock)
      return false;
    return await contract.isLocked(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getTimeLockDate (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(!details.time_lock)
      return false;
    return await contract.stakedOn(account)
  } catch (e) { console.log(e) }
  return 0
}

export async function getTimeLockUntil (account, tokenStake, tokenReward, library) {
  try {
    const { contract, details } = getStakeContract(tokenStake, tokenReward, library, account)
    if(!details.time_lock)
      return false;
    return await contract.lockedUntil(account)
  } catch (e) { console.log(e) }
  return 0
}

export function getStakeContract (tokenStake, tokenReward, library, account) {
  try {
    if (!tokenStake || !tokenReward || !isAddress(tokenStake.address) || tokenStake.address === AddressZero) {
      throw Error(`Invalid 'token' parameter '${tokenStake.address}'.`)
    }
    const stakeContractDetails = getStakingContractDetails(tokenStake, tokenReward)
    const contract = (account) ? getContract(stakeContractDetails.address, stakeContractDetails.abi, library, account) :
      getContract(stakeContractDetails.address, stakeContractDetails.abi, library);
    return {
      contract: contract,
      details: stakeContractDetails
    }
  } catch(e) { console.log(e) }
  return 0
}

export const formatBalance = (value, decimals = 18, maxFraction = 0) => {
  try {
    const formatted = ethers.utils.formatUnits(value, decimals)
    if (maxFraction > 0) {
        const split = formatted.split('.')
        if (split.length > 1) {
            return split[0] + '.' + split[1].substr(0, maxFraction)
        }
    }
    return formatted
  } catch(e) { console.log(e) }
  return 0
}

export const formatBN = (value, decimals = 18) => {
  try {
    const formatted = ethers.utils.parseUnits(value.toString(), decimals)
    return formatted
  } catch(e) { console.log(e) }
  return BigNumber.from(0)
}
