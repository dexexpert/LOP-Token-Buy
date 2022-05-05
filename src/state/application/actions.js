const Types = {
  SET_OPEN_MODAL: 'application/setOpenModal',
  UPDATE_BLOCK_NUMBER: 'application/updateBlockNumber'
}

const setOpenModal = (modal) => ({
  type: Types.SET_OPEN_MODAL,
  payload: {modal}
})

const updateBlockNumber = ({chainId, blockNumber}) => ({
  type: Types.UPDATE_BLOCK_NUMBER,
  payload: { chainId, blockNumber }
})

const ApplicationModal = {
  WALLET: 'application/wallet',
  WRONG_NETWORK: 'application/wrong_network',
  SELECT_TOKEN: 'application/select_token',
  IMPORT_TOKEN: 'application/import_token'
}

export {
  setOpenModal,
  updateBlockNumber,
  Types,
  ApplicationModal
}