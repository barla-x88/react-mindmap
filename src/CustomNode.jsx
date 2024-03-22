import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const defaultNodeStyle = {
  height: '50px',
  border: '1px solid #107372',
  padding: '5px',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const CustomNode = ({ data }) => {
  const [input, setInput] = useState(data.input || '');
  const [bgColor, setBgColor] = useState(data.bg || 'transparent');
  return (
    <div style={{ ...defaultNodeStyle, backgroundColor: bgColor }}>
      <Handle type="target" position={Position.Left} />
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '20px',
          height: '20px',
          border: 'none',
          padding: '0',
          background: bgColor,
        }}
        title="Change Node Background"
      />
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
        title="Click To Edit Node Label"
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
export default CustomNode;
