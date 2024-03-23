import { useState } from 'react';
import { Handle, Position } from 'reactflow';

const defaultNodeStyle = {
  height: '50px',
  border: '1px solid #107372',
  padding: '15px',
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
        name="color"
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: '15px',
          height: '15px',
          border: 'none',
          padding: '0',
        }}
        title="Change Node Background"
      />
      <input
        style={{
          textAlign: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        type="text"
        className="nodrag"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Click To Edit"
        title="Click To Edit Node Label"
        name="label"
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
export default CustomNode;
