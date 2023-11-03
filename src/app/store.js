import {
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';
  import { createWithEqualityFn } from 'zustand/traditional';
  import { nanoid } from 'nanoid/non-secure';
   
  const useStore = createWithEqualityFn((set, get) => ({
    nodes: [
      {
        id: 'root',
        type: 'apiRoot',
        data: { label: 'React Flow Mind Map' },
        position: { x: 0, y: 0 },
      },
    ],
    edges: [],
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    addChildNode: (parentNode, position) => {
      const newNode = {
        id: nanoid(),
        type: 'apiNode',
        data: { label: 'New Node' },
        position,
        // dragHandle: '.dragHandle',
        parentNode: parentNode.id,
      };
  
      const newEdge = {
        id: nanoid(),
        source: parentNode.id,
        target: newNode.id,
      };
  
      set({
        nodes: [...get().nodes, newNode],
        edges: [...get().edges, newEdge],
      });
    },
  }));
   
  export default useStore;