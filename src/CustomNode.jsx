import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const defaultNodeStyle = {
  height: '50px',
  border: '1px solid #BEBFC0',
  padding: '5px',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CustomNode = ({ data, styles = {} }) => {
  const [input, setInput] = useState(data.input || '');

  return (
    <div style={{ ...defaultNodeStyle, ...styles }}>
      <Handle type="target" position={Position.Left} />
      <input
        style={{
          textAlign: 'center',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          textTransform: 'uppercase',
        }}
        type="text"
        className="nodrag"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Click To Edit"
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
export default CustomNode;
