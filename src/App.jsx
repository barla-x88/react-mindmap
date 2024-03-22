import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './CustomNode';

import { nodes as initialNodes } from './nodes';
import { edges as initialEdges } from './edges';

import { useCallback, useState } from 'react';

// Use custom Node
const nodeTypes = { customNode: CustomNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  //handle node changes
  const onNodeChange = useCallback(
    (changes) =>
      setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    []
  );

  //handle edge changes
  const onEdgeChange = useCallback(
    (changes) =>
      setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges)),
    []
  );

  //handle manual node connection
  const onConnect = useCallback(
    (params) => setEdges((currentEdges) => addEdge(params, currentEdges)),
    [ReactFlow]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          type: 'smoothstep',
          markerEnd: { type: 'arrow' },
        }}
        fitView
      >
        <Background color="#EFECEC" style={{ backgroundColor: '#191A1B' }} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
