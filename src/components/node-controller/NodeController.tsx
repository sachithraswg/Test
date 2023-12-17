import React from 'react';
import "./NodeController.css";

interface NodeControllerProps {
  onAddNode: () => void,
  onDisable: (isDisabled: boolean) => void,
  onDelete: () => void,
  disabled: boolean
}

const NodeController: React.FC<NodeControllerProps> = ({ onAddNode, onDisable, onDelete, disabled }) => {
  function handleDisable(event: React.ChangeEvent<HTMLInputElement>) {
    onDisable(event.target.checked);
  }

  return (
    <div className="action-container">
      <div className="action-panel">
        <label className="label">Read only</label>
        <label className="switch">
          <input type="checkbox" checked={disabled} onChange={handleDisable} />
          <span className="slider round"></span>
        </label>
        <button className="delete-button" onClick={onDelete}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      <button className="add-btn" onClick={onAddNode}>
        +
      </button>
    </div>
  );
}

export default NodeController;