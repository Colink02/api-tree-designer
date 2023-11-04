import {
    applyNodeChanges,
    applyEdgeChanges,
    useUpdateNodeInternals,
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
        data: { path: "", method: "GET" },
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
    updateElementData: (nodeId, data) => {
      set({
        nodes: get().nodes.map((node) => {
          if(node.id === nodeId) {
            node.data = data;
          }
          return node;
        }),
      });
    },
    save: (fileName, nodes, edges) => {
      function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', URL.createObjectURL(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
      console.log(nodes, edges);
      const saveBlob = new Blob([JSON.stringify({nodes: nodes, edges: edges})], {
        type: 'application/json'
      });
      download(fileName, saveBlob);
    },
    load: (file) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const contents = e.target.result;
        const json = JSON.parse(contents);
        set({
          nodes: json.nodes,
          edges: json.edges,
        });
      }
      reader.readAsText(file);
    }
  }));
   
  export default useStore;