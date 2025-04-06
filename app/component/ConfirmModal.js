"use client";
import React from "react";

const ConfirmModal = ({
  heading = "Are you sure?",
  subheading = "This action cannot be undone.",
  cancelText = "Cancel",
  okText = "Confirm",
  onCancel,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
        <h2 className="text-xl font-bold text-white mb-2">{heading}</h2>
        <p className="text-sm text-gray-400 mb-6">{subheading}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
