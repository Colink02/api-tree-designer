import { useState } from "react";

export function ApiElement({props}) {
    // The parent of this element (e.g. /api/v1 would have the "api" element as its parent)
    const [parent, setParent] = useState(null);
    // The Path name (e.g. /api/v1/test would be "test" with parent of v1)
    const [apiPath, setApiPath] = useState(props.apiPath);
    // Type of API (GET, POST, PUT, DELETE, etc.)
    const [apiMethod, setApiMethod] = useState("");
    const [description, setDescription] = useState(props.description);

    const onMoveMouse = (e) => {

    };
    const onMoveDown = (e) => {

    };
    const onMoveUp = (e) => {
        
    };

    return (
        <div className="api-node-container draggable">
            <div className="api-node-header">
                <p>{apiPath}</p>
            </div>
            <div className="api-node-description">{description}</div>
        </div>
    )
}