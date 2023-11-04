import {
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
        data: { path: "/api" },
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
    save: (fileName) => {
      function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
      var saveBlob = new Blob([JSON.stringify({nodes: nodes, edges: edges})], {
        type: 'application/json'
      });
      download("api.json", saveBlob);
    },
    load: (fileName) => {
    }
  }));
   
  export default useStore;