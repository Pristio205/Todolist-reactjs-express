import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data } = await axios.get(`https://real-jade-seagull-gown.cyclic.app/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };
  
    getTodos();
  }, [token]);

  const handleAddTodo = async () => {
    try {
      await axios.post(
        `https://real-jade-seagull-gown.cyclic.app/todos`,
        { value: newTodo, status: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      await getUpdatedTodos();
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditTodo = async (todoId, newValue) => {
    try {
      await axios.put(
        `https://real-jade-seagull-gown.cyclic.app/todos/${todoId}`,
        { value: newValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      await getUpdatedTodos();
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://real-jade-seagull-gown.cyclic.app/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated todos after deleting
      await getUpdatedTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const getUpdatedTodos = async () => {
    try {
      const { data } = await axios.get(`https://real-jade-seagull-gown.cyclic.app/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(data);
    } catch (error) {
      console.error('Error fetching updated todos:', error);
    }
  };

  return (
    <div className='todo-container'>
      <div className='todo-title'>
        <h1>My Todo</h1>
      </div>
     
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}>
        <div className='add-todo-container'>
          <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button type="submit">add</button>
        </div>
      </form>

      <div className='todo-list'>
        {loading ? (
          <p>Loading...</p>
        ) : Array.isArray(todos) && todos.length === 0 ? (
          <p>tidak ada todo</p>
        ) : (
          todos.data.map((item) => (
            <div className='todo-item' key={item._id}>
              <div className='todo-item-1'>
                <span>{item.value}</span>
              </div>
              <div className='todo-item-2'>
                <button onClick={() => handleEditTodo(item._id, prompt('Enter new text:'))}>✏️</button>
                <button onClick={() => handleDeleteTodo(item._id)}>❌</button>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
