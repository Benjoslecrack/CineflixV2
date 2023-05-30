"use client";

import { useState } from "react";

const MyModal = ({ buttonText, buttonStyle, modalTitle, modalContent }) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    return (
      <>
        <button onClick={handleOpenModal} className={buttonStyle}>{buttonText}</button>
  
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{modalTitle}</h3>
                <button onClick={handleCloseModal}>&times;</button>
              </div>
              <div className="modal-body">
                {modalContent}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default MyModal;