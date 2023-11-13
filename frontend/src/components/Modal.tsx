import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  modalIsOpen: boolean;
}
const ModalComponent: React.FC<ModalProps> = ({
  children,
  modalIsOpen,
}) => {
  return (
    <>
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">{children}</div>
        </div>
      )}
    </>
  );
};
export default ModalComponent;
