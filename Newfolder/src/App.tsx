import React from 'react';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import LoginForm from './components/LoginForm';

function App() {
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginForm/>} />
          </Routes>
         
        </BrowserRouter>

    </>
  );
}

export default App;
