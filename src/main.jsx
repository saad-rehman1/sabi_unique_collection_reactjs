import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { ToastContainer } from 'react-toastify'; // ✅ only this
import 'react-toastify/dist/ReactToastify.css';  // ✅ required CSS

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-right" autoClose={2000} />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
