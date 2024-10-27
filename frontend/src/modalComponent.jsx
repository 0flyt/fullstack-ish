import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const ModalComponent = ({
  isOpen,
  onClose,
  onSave,
  isEditMode,
  existingPost,
  onDelete,
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
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '400px',
        },
      }}
    >
      <h2>{isEditMode ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isEditMode ? 'Update Post' : 'Create Post'}
        </button>
      </form>
      <button onClick={onClose}>Cancel</button>
      {isEditMode ? <button onClick={onDelete}>Delete</button> : null}
    </Modal>
  );
};

ModalComponent.propTypes;

export default ModalComponent;
