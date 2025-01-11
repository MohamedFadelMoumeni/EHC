import React, { useEffect } from "react";

const Modal = ({ isVisible, onClose, title, children }) => {
  // Disable body scroll when the modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose} // Close modal when clicking on background
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 mt-10 mb-10 relative"
        style={{
          width: "90%",
          maxWidth: "650px",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && (
          <h2
            className="text-2xl font-semibold mb-4 text-center"
            style={{ color: "#168187" }}
          >
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
