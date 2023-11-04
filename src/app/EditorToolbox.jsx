"use client";
import React from 'react';
import { useUpdateNodeInternals } from 'reactflow';

const EditorToolbox = ({saveFn, loadFn}) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const onSave = () => {
        saveFn("api.apimap");
    };

    const onLoad = () => {
        if(document.getElementById('input_file').files.length === 0) return;
        loadFn(document.getElementById('input_file').files[0]);
        updateNodeInternals();
    };

    const openFile = () => {
        const input = document.getElementById('input_file');
        input.onchange = e => {
            onLoad();
        };
        input.click();
    };

  return (
    <div className='toolbox'>
      <button onClick={openFile}>Load</button>
      <button onClick={onSave}>Save</button>
      <input type="file" id="input_file" accept=".apimap" style={{ display: 'none' }} />
    </div>
  );
};

export default EditorToolbox;
