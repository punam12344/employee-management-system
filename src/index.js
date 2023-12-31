import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Components/Navbar'
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import Employee from './Components/Employee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/RegistrationForm' element={<RegistrationForm/>}></Route>
      <Route path='/LoginForm' element={<LoginForm/>}></Route>
      <Route path='/Employee' element={<Employee/>}></Route>

    </Routes>

    
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
