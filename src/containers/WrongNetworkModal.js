import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import Modal from "../components/Modal";
import { ApplicationModal } from "../state/application/actions";
import {
  useModalOpen,
  useWrongNetworkModalOpen,
  useWrongNetworkModalClose,
} from "../state/application/hooks";
import { isRightNetwork } from "../utils/web3";
import Button from "../components/Button";

export default function WrongNetworkModal() {
  const { account, chainId, connector, deactivate } = useWeb3React();
  const wrongNetworkModalOpen = useModalOpen(ApplicationModal.WRONG_NETWORK);
  const openWrongNetworkModal = useWrongNetworkModalOpen();
  const closeWrongNetworkModal = useWrongNetworkModalClose();

  useEffect(() => {
    if (account) {
      if (!isRightNetwork(chainId)) {
        openWrongNetworkModal();
      } else {
        closeWrongNetworkModal();
      }
    } else {
      closeWrongNetworkModal();
    }
  }, [account, chainId, openWrongNetworkModal, closeWrongNetworkModal]);

  const logout = () => {
    deactivate();

    if (typeof connector.close === "function") {
      connector.close();
    }
  };

  return (
    <Modal
      title="Wrong Network"
      hasClose={true}
      onClose={closeWrongNetworkModal}
      show={wrongNetworkModalOpen}
    >
      <span className="text-white">Please connect to DBX Main Network.</span>
      <Button className="human-green mt-3" onClick={logout}>
        Logout
      </Button>
    </Modal>
  );
}
