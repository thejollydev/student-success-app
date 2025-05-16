import { useState, useEffect } from 'react';
import './App.css'; // You can keep or remove the default styling

function App() {
  const [messageFromBackend, setMessageFromBackend] = useState('');
  const [structuredMessage, setStructuredMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the simple hello message
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/hello') // Backend URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Expecting plain text
      })
      .then(data => setMessageFromBackend(data))
      .catch(error => {
        console.error("Error fetching /hello:", error);
        setError(`Error fetching /hello: ${error.message}. Check if backend is running and CORS is configured.`);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Fetch the structured message
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/message') // Backend URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Expecting JSON
      })
      .then(data => setStructuredMessage(data))
      .catch(error => {
        console.error("Error fetching /message:", error);
        setError(prevError => `${prevError || ''} Error fetching /message: ${error.message}.`);
      });
  }, []); // Empty dependency array

  return (
    <>
      <h1>Student Success App Frontend</h1>

      <h2>Message from Backend (/hello):</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>{messageFromBackend || "Loading hello message..."}</p>

      <h2>Structured Message from Backend (/message):</h2>
      {structuredMessage ? (
        <pre>{JSON.stringify(structuredMessage, null, 2)}</pre>
      ) : (
        <p>Loading structured message...</p>
      )}
    </>
  );
}

export default App;