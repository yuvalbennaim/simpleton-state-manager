import React, { useEffect, useState } from 'react';
import useStateStore from './hooks/useStateStore';
import './App.css';
import LoginForm from "./components/loginForm";
import ToDoView from "./components/ToDoView";

function App() {

  const store = useStateStore();
	const [user, setUser] = useState();

  const mockData = {
    ben: {
      name: "ben",
      categories: ["House", "Cars", "School", "Work"],
      priorites: ["High", "Medium", "Low"],
      todos: [
        { "title": "Take out the garbage", "category": "House", "status": "open" },
        { "title": "Wash Car", "category": "Cars", "status": "closed" },
        { "title": "Do Laundry", "category": "House", "status": "open" },
        { "title": "Do Homewoork", "category": "School", "status": "open" },
        { "title": "File Report", "category": "Work", "status": "open" }    
      ]
    },
    jerry: {
      name: "jerry",
      categories: ["House", "Cars", "Work"],
      priorites: ["High", "Medium", "Low"],
      todos: []
    }
  };

  store.setModel("MOCK_DATA", mockData);

  store.subscribe('USER', 'todo-app', (model) => { // subscribe to the user model and re-render when it updates
    console.log('USER Model changed', model);
    setUser(model);
    getTodos(model);    
  });

	const getTodos = (user) => {
    new Promise((resolveFunc, rejectFunc) => {
      let todos = mockData[user];
      console.log("getTodos", user, todos);
      setTimeout(() => { resolveFunc(todos); }, 1000);
    }).then(function(todos) {
      store.setModel("TODOS", todos);
    }); 
	};

	useEffect(() => {
    console.log('App mounted...');
	}, []);

	return (
		<div className="page-wrapper">		
      { 
        user == null ? <LoginForm></LoginForm> : <ToDoView></ToDoView>
      }
    </div>
	);
}

export default App;