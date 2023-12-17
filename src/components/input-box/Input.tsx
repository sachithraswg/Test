import React, { useState } from "react";
import "./Input.css";
import NodeController from "./../node-controller/NodeController";
import { InputNode } from "../../models/InputNode";

interface InputProps {
  nodes: InputNode, 
  focusedId: number, 
  onFocus: (parentId: number) => void, 
  onAddNode: (parentId: number) => void, 
  onDeleteNode: (parentId: number) => void
}

interface InputState {
  isDisabled: boolean
}

const Input: React.FC<InputProps> = ({ nodes, focusedId, onFocus, onAddNode, onDeleteNode }) => {
  const [state, setDisabled] = useState<InputState>({isDisabled: false});
  
  function handleDisable(isDisabled: boolean) {
    setDisabled((prevState: InputState) => ({ isDisabled: isDisabled}));
  }

  return (
    <li
      className={
        nodes && nodes.child && nodes.child.length > 0 ? "container" : ""
      }
    >
      <div className="input-wrapper">
        <span>
          <input
            className="input"
            onClick={() => onFocus(nodes.id)}
            readOnly={state.isDisabled}
          />
          {state.isDisabled && <i className="fa-solid fa-lock disable-icon"></i>}
        </span>
        {focusedId === nodes.id && (
          <NodeController
            onAddNode={() => onAddNode(nodes.id)}
            onDisable={handleDisable}
            onDelete={() => onDeleteNode(nodes.id)}
            disabled={state.isDisabled}
            key={nodes.id}
          ></NodeController>
        )}
      </div>
      <ul>
        {nodes.child.map((child) => (
          <Input
            focusedId={focusedId}
            nodes={child}
            onFocus={onFocus}
            onAddNode={onAddNode}
            onDeleteNode={onDeleteNode}
            key={child.id}
          />
        ))}
      </ul>
    </li>
  );
}

export default Input;