import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';

const ToDoHeader = () => {
    const store = useStateStore();
	const [todos, setTodos] = useState([]);
    const [user] = useState(store.getModel("USER"));

    useEffect(() => { 
        store.subscribe('TODOS', 'todo-header', (model) => {
            setTodos(model);
        });
    }, []);

	return (
		<div className="todo-header">
            {user}'s To Do List [{todos.length}]
        </div>
	)
};

export default ToDoHeader;
