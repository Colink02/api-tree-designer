import { useState, useRef } from "react";
import { Handle, Position } from "reactflow";
import ContentEditable from "react-contenteditable";

export function ApiElement({ data, isConnectable, selected }) {
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);
  // The Path name (e.g. /api/v1/test would be "test" with parent of v1)
  const [apiPath, setApiPath] = useState(data?.path || "");
  // Type of API (GET, POST, PUT, DELETE, etc.)
  const [apiMethod, setApiMethod] = useState(data?.method || "GET");
  const [apiMethodColor, setApiMethodColor] = useState("green"); // TODO: Change this to a map of colors for each method
  const [description, setDescription] = useState(data?.description);

  const handleApiPathChange = (event) => setApiPath(event.target.value);

  const focusHeader = () => {
    if (selected) {
      console.log(headerRef);
      headerRef.current.focus();
    }
  };

  const handleKeyDown = (evt) => {
    const { key } = evt;
    switch (key) {
      case "Enter":
        headerRef.current.blur();
        break;
    }
  };

  const handleMethodChange = (event) =>  {
    const methodType = event.target.innerHTML;
    if(methodType === "DELETE") {
        setApiMethodColor("red");
    } else {
        setApiMethodColor("green");
    }
    setApiMethod(methodType);

    setApiMethod(event.target.innerHTML);
    dropdownRef.current.classList.toggle("active");
  }
  const selectMethod = () => dropdownRef.current.classList.toggle("active");

  return (
    <div className="api-node-container" onClick={focusHeader}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-header-wrapper">
          {apiMethod ? <b className="node-method" onClick={selectMethod} style={{backgroundColor: apiMethodColor}}>{apiMethod}</b> : null}
          <div className="node-method-dropdown" ref={dropdownRef}>
            <a className="dropdown-trigger" href="#" onClick={handleMethodChange}>GET</a><br />
            <a className="dropdown-trigger" href="#" onClick={handleMethodChange}>POST</a><br />
            <a className="dropdown-trigger" href="#" onClick={handleMethodChange}>PUT</a><br />
            <a className="dropdown-trigger" href="#" onClick={handleMethodChange}>DELETE</a><br />
            <a className="dropdown-trigger" href="#" onClick={handleMethodChange}>PATCH</a>
          </div>
        <ContentEditable
          className="api-node-header"
          html={apiPath}
          onChange={handleApiPathChange}
          disabled={false}
          spellCheck={false}
          innerRef={headerRef}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="api-node-description">{description}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}
