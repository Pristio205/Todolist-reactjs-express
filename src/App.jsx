import React from 'react';
import {Route, Routes } from "react-router-dom";
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Routes>
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
