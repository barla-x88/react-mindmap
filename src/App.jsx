import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './CustomNode';

import { nodes } from './nodes';

// Use custom Node
const nodeTypes = { customNode: CustomNode };

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}>
        <Background color="#EFECEC" style={{ backgroundColor: '#191A1B' }} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
