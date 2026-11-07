import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import JokeGenerator from './JokeGenerator.jsx';
import './index.css';

const isJokeGenerator = window.location.pathname.replace(/\/+$/, '') === '/joke-generator';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {isJokeGenerator ? <JokeGenerator /> : <App />}
    </BrowserRouter>
  </React.StrictMode>
);
