import { useEffect, useState } from 'react';
import './App.css';
import ModalComponent from './modalComponent';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [state, setState] = useState([]);
  const [refresh, setRefresh] = useState(false);

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const formattedDate = (date) => {
    return dayjs
      .utc(date)
      .tz('Europe/Stockholm')
      .add(1, 'hour')
      .format('YYYY-MM-DD HH:mm');
  };

  const handleNewPost = () => {
    setIsEditMode(false);
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEditPost = (post) => {
    setIsEditMode(true);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDeletePost = async () => {
    await fetch(`/api/post/${selectedPost.id}`, {
      method: 'DELETE',
    });
    setRefresh(!refresh);
    setIsModalOpen(false);
  };

  const handleSavePost = async (postData) => {
    if (isEditMode) {
      await fetch(`/api/update/${selectedPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
    } else {
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
    }
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        setState(result);
      });
  }, [refresh]);

  return (
    <>
      <div className="blog-container">
        <h1>Hej hej bloggen</h1>
        <button onClick={handleNewPost}>New post</button>

        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePost}
          isEditMode={isEditMode}
          existingPost={selectedPost}
          onDelete={handleDeletePost}
        />

        <div className="post-list">
          {state
            // .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((item) => (
              <div className="post-card" key={item.id}>
                <h2 className="post-title">{item.title}</h2>
                <p className="post-date">
                  {item.isupdated
                    ? `Updated at: ${formattedDate(item.updated_at)}`
                    : `Posted at: ${formattedDate(item.created_at)}`}
                </p>
                <p className="post-content">{item.content}</p>
                <button
                  onClick={() =>
                    handleEditPost({
                      id: item.id,
                      title: item.title,
                      content: item.content,
                    })
                  }
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
