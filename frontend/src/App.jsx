import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch('/api/one')
      .then((response) => response.json())
      .then((result) => {
        alert(`Hello ${result.hello}!`);
      });
  }, []);

  return <>Hej</>;
}

export default App;
