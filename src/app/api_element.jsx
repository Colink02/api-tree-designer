import { useState } from "react";

export function ApiElement() {
    // The parent of this element (e.g. /api/v1 would have the "api" element as its parent)
    const [parent, setParent] = useState(null);
    // The Path name (e.g. /api/v1/test would be "test" with parent of v1)
    const [apiPath, setApiPath] = useState("");
    // Type of API (GET, POST, PUT, DELETE, etc.)
    const [apiMethod, setApiMethod] = useState("");
    const [description, setDescription] = useState("");


    return (
        <div className="api-container">
            <div className="api-header">
                <p>{this.props.title}</p>
            </div>
            <div className="api-node-description">{props.description}</div>
        </div>
    )
}