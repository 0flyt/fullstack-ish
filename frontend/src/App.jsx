import { useEffect, useState } from 'react';
import './App.css';
import ModalComponent from './modalComponent';

function App() {
  const [state, setState] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [textValue, setTextValue] = useState('');

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((result) => {
        setState(result);
        console.log('state:', result);
      });
  }, []);

  return (
    <>
      <div className="blog-container">
        <h1>Hej hej bloggen</h1>
        <button onClick={() => setModalIsOpen(true)}>New post</button>

        <ModalComponent
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title="Write your post"
          text={textValue}
          handleTextChange={handleTextChange}
        />

        <div className="post-list">
          {state.map((item, index) => (
            <div className="post-card" key={index}>
              <h2 className="post-title">{item.title}</h2>
              <p className="post-date">{item.created_at}</p>
              <p className="post-content">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
