import React, { useState } from "react";
import "./Port-Template.css";
import Input from "./../input-box/Input";
import { InputNode, InputNodeClass } from "../../models/InputNode";

interface PortTemplateState {
  focusedId: string;
  nodes: InputNode[];
}

const PortTemplate: React.FC<any> = () => {
  const [state, setState] = useState<PortTemplateState>({focusedId: '', nodes: []});

  const addNode = () => {
    if ( !!state.focusedId ) {
      handleAddNode(state.focusedId);
    } else {
      let id = state.nodes && state.nodes.length > 0 ? state.nodes[state.nodes.length - 1].id + 1 : 0;
      let newNodes = [
        ...state.nodes,
        new InputNodeClass(nextIdGenerator(null), ''),
      ];
      setState((prevState) => ({...prevState, nodes: newNodes } ));
    }
  }

  function nextIdGenerator( parentNode: InputNode | null ): string {
    if ( !parentNode ) {
      if ( state.nodes.length === 0 ) {
        return '0';
      } else {
        return '' + (parseInt(state.nodes[state.nodes.length - 1].id) + 1);
      }
    } else {
      if ( parentNode.child.length > 0 ) {
        let idParts = parentNode.child[parentNode.child.length -1].id.split('.');
        idParts[idParts.length -1] = ''+(parseInt(idParts[idParts.length - 1]) + 1);
        return idParts.join('.');
      } else {
        return parentNode.id + ".0"
      }
    }
  }

  function handleFocus(parentId: string) {
    setState(prevState => ({...prevState, focusedId: parentId}));
  }

  function handleDelete(parentId: string) {
    setState((prevNodes) => ({...prevNodes, focusedId: '', nodes: deleteNodeRecursively(prevNodes.nodes, parentId)}));
  }

  function handleAddNode(parentId: string) {
    setState((prevNodes) => ({...prevNodes, nodes: updateNodeRecursively(prevNodes.nodes, parentId)}));
  }

  function deleteNodeRecursively(nodes: InputNode[], parentId: string) {
    let x = nodes.filter((node) => {
      if (node.id === parentId) {
        return false;
      } else if (node && node.child && node.child.length > 0) {
        node.child = deleteNodeRecursively(node.child, parentId);
      }
      return true;
    });
    return x;
  }

  function updateNodeRecursively(nodes: InputNode[], parentId: string): any {
    return nodes.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          child: [
            ...node.child,
            new InputNodeClass(nextIdGenerator(node), ''),
          ],
        };
      } else if (node.child && node.child.length > 0) {
        return { ...node, child: updateNodeRecursively(node.child, parentId) };
      } else {
        return node;
      }
    });
  }

  function handleSave() {
    const jsonBlob = new Blob([JSON.stringify(state.nodes)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function loadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          if (event.target && typeof event.target.result === 'string') {
            const parsedData = JSON.parse(event.target.result);
            setState((prevState) => ({...parsedData, nodes: parsedData}) );
          } else {
            console.error('Data Error');
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <>
      <div className="template-header">
        <div className="supportive-btns">
          <input type="file" id="attachment" className="attachment" onChange={loadFile} style={{display: 'none'}} />
          <label htmlFor="attachment" className="add-btn attachment" >
            <i className="fa-solid fa-paperclip"></i>
          </label>
          <button className="add-btn" onClick={addNode}>
            +
          </button>
        </div>
        <div className="supportive-btns">
          <button className="primary-btn" onClick={handleSave}>Save</button>
          <button className="secondary-btn">Back</button>
        </div>
      </div>
      <div className="graph-container">
        <ul>
          {state.nodes.map((node) => (
            <Input
              key={node.id}
              nodes={node}
              focusedId={state.focusedId}
              onFocus={handleFocus}
              onAddNode={handleAddNode}
              onDeleteNode={handleDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default PortTemplate;