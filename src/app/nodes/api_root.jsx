import { useState, useRef, useEffect, useCallback } from "react";
import ContentEditable from "react-contenteditable";
import { Handle, Position } from "reactflow";

export function ApiRoot({ data, isConnectable, selected }) {
  const headerRef = useRef("");
  // The Path name (e.g. /api/v1/test would be "test" with parent of v1)
  const [apiPath, setApiPath] = useState(data.path || "");

  const handleApiPathChange = (event) => setApiPath(event.target.value);

  // useEffect(() => {
  //     if(selected) header.current.focus();
  // }, [selected]);

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

  return (
    <div className="api-node-container" onClick={focusHeader}>
      <ContentEditable
        className="api-node-header"
        html={apiPath}
        onChange={handleApiPathChange}
        disabled={false}
        spellCheck={false}
        innerRef={headerRef}
        onKeyDown={handleKeyDown}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}
