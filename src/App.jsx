import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow>
        <Background color="#EFECEC" style={{ backgroundColor: '#191A1B' }} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default App;
