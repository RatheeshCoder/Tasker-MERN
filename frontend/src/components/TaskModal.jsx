import React, { useState } from 'react';

const TaskModal = ({ showModal, onClose, onSave, taskName: initialTaskName, taskCategories: initialTaskCategories }) => {
  const [taskName, setTaskName] = useState(initialTaskName || '');
  const [taskCategories, setTaskCategories] = useState(initialTaskCategories || '');

  const handleSave = () => {
    onSave(taskName, taskCategories);
    onClose();
  };

  return (
    <div id="modelConfirm" className={`fixed ${showModal ? 'block' : 'hidden'} z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center p-10`}>
      <div className="max-w-md p-6 bg-white rounded-md shadow-xl modal-content">
        <div className="flex justify-end">
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5" onClick={onClose}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>

        <div className="text-center">
          <h3 className="mt-5 mb-6 text-xl font-normal text-gray-500">Your Task?</h3>
          <div className="flex items-center justify-center mb-3">
            <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="p-2 mr-2 border rounded-lg" />
            <select value={taskCategories} onChange={(e) => setTaskCategories(e.target.value)} className="p-2 border rounded-lg">
            <option value="">Categories</option>
              <option value="Home" style={{ color: 'green' }}>Home</option>
              <option value="School" style={{ color: 'blue' }}>School</option>
              <option value="Training" style={{ olor: 'gray' }}>Training</option>
              <option value="Other" style={{ color: 'yellow' }}>Other</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 mr-2" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5" onClick={onClose} data-modal-toggle="delete-user-modal">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
