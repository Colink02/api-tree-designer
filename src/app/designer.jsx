"use client";

import React, { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useReactFlow,
  useEdgesState,
  useStoreApi,
  addEdge,
} from 'reactflow'; 
import { shallow } from 'zustand/shallow';
import useStore from './store';
import 'reactflow/dist/style.css';
import { ApiElement } from './nodes/api_element';
import { ApiRoot } from './nodes/api_root';


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
});
const nodeOrigin = [0.5, 0.5];

export default function Designer() {
  // Add custom node types
  const nodeTypes = useMemo(() => ({ apiNode: ApiElement, apiRoot: ApiRoot}), []);


  const { project } = useReactFlow();
  const store = useStoreApi();
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );

  const connectingNodeId = useRef(null);


  const onConnectStart = useCallback((_, { nodeId }) => {
    // we need to remember where the connection started so we can add the new node to the correct parent on connect end
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const getChildNodePosition = (event, parentNode) => {
        const { domNode } = store.getState();
    
        if (
          !domNode ||
          // we need to check if these properites exist, because when a node is not initialized yet,
          // it doesn't have a positionAbsolute nor a width or height
          !parentNode?.positionAbsolute ||
          !parentNode?.width ||
          !parentNode?.height
        ) {
          return;
        }
    
        const { top, left } = domNode.getBoundingClientRect();
    
        // we need to remove the wrapper bounds, in order to get the correct mouse position
        const panePosition = project({
          x: event.clientX - left,
          y: event.clientY - top,
        });
    
        // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
        return {
          x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
          y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
        };
      };

      const { nodeInternals } = store.getState();
      const targetIsPane = (event.target).classList.contains(
        'react-flow__pane'
      );
      const node = (event.target).closest('.react-flow__node');

      if (node) {
        node.querySelector('input')?.focus({ preventScroll: true });
      } else if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeInternals.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [addChildNode, project, store]
  );



  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow 
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              nodeOrigin={nodeOrigin}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              style={{ background: '#222222' }}
              snapToGrid
              snapGrid={[28, 28]}
              fitView >
          <Controls />
          <Background />
      </ReactFlow>
    </div>
  );
}
