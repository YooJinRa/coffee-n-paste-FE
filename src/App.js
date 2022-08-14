// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostingPage from './pages/PostingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<MainPage />} /> */}
        <Route path='/post/' element={<PostingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
