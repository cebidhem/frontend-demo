// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch names when component mounts
    fetchNames();
  }, []);

  const fetchNames = async () => {
    try {
      const response = await axios.get<{ names: string[] }>(`${backendUrl}/names`);
      setNames(response.data.names);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${backendUrl}/names`, { name });
      fetchNames(); // Fetch names again after storing a new name
      setName(''); // Clear the input field after submitting
    } catch (error) {
      console.error('Error storing name:', error);
    }
  };

  return (
      <div>
        <h1>Names</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Enter a name"
              value={name}
              onChange={(event) => setName(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <h2>All Names:</h2>
        <ul>
          {names.map((name, index) => (
              <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;
