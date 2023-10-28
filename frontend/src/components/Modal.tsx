import React, { ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  children: ReactNode;
  modalIsOpen: boolean;
  closeModal: () => void;
}
const Modal: React.FC<ModalProps> = ({ children, closeModal, modalIsOpen }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
  };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Account Confirmation Modal"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
