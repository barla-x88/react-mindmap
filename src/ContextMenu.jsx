const ContextMenu = ({
  positions = {},
  autoLayout,
  removeContextMenu,
  flowPosition,
  addNode,
}) => {
  return (
    <div
      className="context-menu"
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        zIndex: '10',
        ...positions,
      }}
    >
      <button
        onClick={() => {
          addNode(flowPosition);
          removeContextMenu();
        }}
        title="Add Node At mouse Position"
      >
        Add Node
      </button>

      <button
        onClick={() => {
          autoLayout();
          removeContextMenu();
        }}
        title="Align Nodes Automatically"
      >
        Auto Layout
      </button>
    </div>
  );
};
export default ContextMenu;
