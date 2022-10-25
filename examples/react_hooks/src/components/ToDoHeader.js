import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import { RenderCounterDisplay, useRenderCounter } from  "../hooks/useRenderCounter";

const ToDoHeader = () => {
    const store = useStateStore();
	const [todos, setTodos] = useState([]);
    const [user] = useState(store.getModel("USER"));
    const [renderCount, increaseFn] = useRenderCounter();

    useEffect(() => { 
        store.subscribe('TODOS', 'todo-header', (model) => {
            setTodos(model);
        });
    }, []);

    increaseFn();

	return (
		<div className="todo-header">
            {user}'s To Do List [{todos.length}]
            <RenderCounterDisplay renderTitle="ToDoHeader" renderCount={renderCount} renderStyle={{fontSize: "10px"}}/>
        </div>
	)
};

export default ToDoHeader;
