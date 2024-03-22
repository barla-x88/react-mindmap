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
import Dagre from '@dagrejs/dagre';

import { nodes as initialNodes } from './nodes';
import { edges as initialEdges } from './edges';

import { useCallback, useEffect, useState } from 'react';

// Use custom Node
const nodeTypes = { customNode: CustomNode };

//Layout setup
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    const layouted = getLayoutedElements(nodes, edges, { direction: 'LR' });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [nodes, edges]);

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
        onPaneClick={(e) => {
          console.log(e);
          console.log(nodes, edges);
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
