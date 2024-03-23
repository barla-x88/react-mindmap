const ContextMenu = ({
  positions = {},
  autoLayout,
  removeContextMenu,
  flowPosition,
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
      <button>Add Node</button>

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
