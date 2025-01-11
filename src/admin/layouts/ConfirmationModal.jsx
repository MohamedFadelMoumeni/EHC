import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 absolute top-20 left-1/2 transform -translate-x-1/2">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirmation</h2>
                <p className="text-gray-700 text-lg mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-lg mr-4 hover:bg-gray-400"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
