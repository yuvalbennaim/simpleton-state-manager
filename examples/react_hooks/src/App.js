import React, { useEffect, useState } from 'react';
import useStateStore from './hooks/useStateStore';
import './App.css';
import LoginForm from "./components/LoginForm";
import ToDoView from "./components/ToDoView";

function App() {

  const store = useStateStore();
	const [user, setUser] = useState();

  const mockData = { //emulate API call to get the ToDo list
    Ben: {
      name: "Ben",
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
    Jerry: {
      name: "Jerry",
      categories: ["House", "Cars", "Work"],
      priorites: ["High", "Medium", "Low"],
      todos: []
    }
  };

  store.setModel("MOCK_DATA", mockData);
  

	const getTodos = (user) => {
    new Promise((resolveFunc, rejectFunc) => {
      let data = mockData[user];
      console.log("getTodos", user, data);
      setTimeout(() => { resolveFunc(data); }, 1000);
    }).then(function(data) {
      store.setModel("TODOS", data.todos);
      store.setModel('CATEGORIES', data.categories);          
      store.setModel('PRIORITES', data.categories);  
    }); 
	};

	useEffect(() => {
    console.log('App mounted...');

    store.subscribe('USER', 'todo-app', (model) => { // subscribe to the user model and re-render when it updates
      console.log('USER Model changed', model);
      setUser(model);
      getTodos(model);    
    });
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