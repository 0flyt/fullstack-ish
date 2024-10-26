import Modal from 'react-modal';

const ModalComponent = ({ isOpen, onClose, title, text, handleTextChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '400px',
        },
      }}
    >
      <h2>{title}</h2>
      <textarea
        className="modal-textarea"
        value={text}
        onChange={handleTextChange}
        placeholder="Write post here.."
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <div>
        <button onClick={onClose}>Close</button>
        <button
          onClick={() => {
            console.log(text);
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

ModalComponent.propTypes;

export default ModalComponent;
