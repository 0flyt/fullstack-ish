import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modalStyle.css';

const ModalComponent = ({
  existingPost,
  isEditMode,
  isOpen,
  onClose,
  onDelete,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEditMode && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [isEditMode, existingPost]);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ title, content });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onDelete}
      contentLabel={isEditMode ? 'Edit Post' : 'New Post'}
      style={{
        content: {
          bottom: 'auto',
          left: '50%',
          right: 'auto',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
        },
      }}
    >
      <h2 className="modal-title">{isEditMode ? 'Edit Post' : 'New Post'}</h2>
      <form className="modal-form" onSubmit={handleSave}>
        <div className="modal-group">
          <label>Title</label>
          <input
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a title here"
            required
            type="text"
            value={title}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            className="textarea-field"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a post here"
            required
            value={content}
          />
        </div>
        <div className="button-group">
          {isEditMode ? (
            <button className="btn-danger" onClick={onDelete}>
              Delete
            </button>
          ) : null}
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" type="submit">
            {isEditMode ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

ModalComponent.propTypes;

export default ModalComponent;
