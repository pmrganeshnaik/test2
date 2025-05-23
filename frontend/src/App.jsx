// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [homeMessage, setHomeMessage] = useState('');
  const [apiData, setApiData] = useState({ message: '', randomNumber: null, timestamp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  const fetchData = async (endpoint, setData) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://test2-backend-bj6r.onrender.com${endpoint}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData('/', (data) => setHomeMessage(data));
    fetchData('/api', (data) => setApiData(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          React Frontend
        </h1>

        {/* Home Endpoint */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Home Endpoint
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-700 bg-gray-50 p-3 rounded">{homeMessage}</p>
          )}
        </div>

        {/* API Endpoint */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            API Endpoint
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="text-gray-700 bg-gray-50 p-3 rounded">
              <p><strong>Message:</strong> {apiData.message}</p>
              <p><strong>Random Number:</strong> {apiData.randomNumber}</p>
              <p><strong>Timestamp:</strong> {apiData.timestamp}</p>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => {
            fetchData('/', (data) => setHomeMessage(data));
            fetchData('/api', (data) => setApiData(data));
          }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default App;