"use client";

import { useState, useEffect, useRef } from "react";

const MyModal = ({ buttonText, buttonStyle, modalTitle, modalContent }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={handleOpenModal} className={buttonStyle}>
        {buttonText}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="modal-container bg-white w-1/2 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
          >
            <div className="modal-content py-4 text-left px-6 bg-[#14181c]">
              <div className="modal-header flex justify-between items-center">
                <h3 className="text-lg font-semibold">{modalTitle}</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body mt-2">{modalContent}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyModal;
