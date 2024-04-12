import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './CustomNode';
import Dagre from '@dagrejs/dagre';

import { nodes as initialNodes } from './nodes';
import { edges as initialEdges } from './edges';

import { useCallback, useRef, useState } from 'react';
import ContextMenu from './ContextMenu';
import { nanoid } from 'nanoid';
import SplashScreen from './SplashScreen';
import Summary from './Summary';

// Use custom Node
const nodeTypes = { customNode: CustomNode };

//Layout setup
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({
    rankdir: options.direction,
    nodesep: options.nodesep,
    ranksep: options.ranksep,
  });

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
  const { fitView } = useReactFlow();
  const [showSplash, setShowSplash] = useState(true);
  const [nodes, setNodes, onNodeChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);

  const [showSummary, setShowSummary] = useState(null);

  const ref = useRef(null);

  //Auto Layout function
  const layout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges, {
      direction: 'LR',
      nodesep: 50,
      ranksep: 200,
    });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView({ duration: 1000 });
    });
  }, [nodes, edges]);

  //handle manual node connection
  const onConnect = useCallback(
    (params) => setEdges((currentEdges) => addEdge(params, currentEdges)),
    [ReactFlow]
  );

  //display context menu
  // https://reactflow.dev/examples/interaction/context-menu
  const onContextmenu = useCallback(
    (event) => {
      event.preventDefault();
      const pane = ref.current.getBoundingClientRect();
      const flowPosition = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const position = {
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      };
      setMenu({ position, flowPosition });
    },
    [reactFlowInstance]
  );

  // Add new nodes
  const addNode = useCallback(
    (position) => {
      const newNode = {
        id: nanoid(),
        position: { x: position.x, y: position.y },
        type: 'customNode',
        data: { input: '', bg: '#009DF7' },
      };

      reactFlowInstance.addNodes(newNode);
    },
    [reactFlowInstance]
  );

  //display summary
  const displaySummary = useCallback((event, node) => {
    console.log(node.position);
    setShowSummary({
      data: node.data.data,
      position: {
        top: `${event.clientY - 250}px`,
        left: `${event.clientX}px`,
      },
    });
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {showSplash && <SplashScreen close={() => setShowSplash(false)} />}
      {showSummary && (
        <Summary data={showSummary.data} position={showSummary.position} />
      )}
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          type: 'smoothstep',
          markerEnd: { type: 'arrow', color: '#3DA480' },
          style: { stroke: '#3DA480' },
        }}
        onEdgeClick={(_, edge) => {
          console.log(edge);
        }}
        fitView
        onPaneContextMenu={onContextmenu}
        onPaneClick={() => {
          setMenu(null);
        }}
        onInit={setReactFlowInstance}
        // onNodeMouseEnter={displaySummary}
        // onNodeMouseLeave={() => setShowSummary(null)}
      >
        {menu && (
          <ContextMenu
            positions={menu.position}
            flowPosition={menu.flowPosition}
            autoLayout={layout}
            removeContextMenu={() => {
              setMenu(null);
            }}
            addNode={addNode}
          />
        )}
        <Background color="#EFECEC" style={{ backgroundColor: '#191A1B' }} />
        <Controls />
        <MiniMap nodeStrokeColor="#191A1B" />
      </ReactFlow>
    </div>
  );
}

export default App;
