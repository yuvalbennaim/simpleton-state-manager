import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';

const ToDoView = () => {
    const store = useStateStore();
	const [todos, setTodos] = useState();

    store.subscribe('TODOS', 'todo-header', (model) => { // subscribe to the user model and re-render when it updates
        console.log('TODOS Model changed', model);
        setTodos(JSON.stringify(model));
    });

	return (
		<div className="todo">
			ToDoView {todos}
		</div>
	)
};

export default ToDoView;
