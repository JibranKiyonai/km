import React from 'react';

const CustomConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90000000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-dark rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this PDF Data?</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Yes, Delete</button>
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmationModal;
