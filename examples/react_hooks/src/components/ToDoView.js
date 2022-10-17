import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import { RenderCounterDisplay, useRenderCounter } from  "../hooks/useRenderCounter";
import ToDoHeader from "./ToDoHeader";

const ToDoView = () => {
    const store = useStateStore();
	const [todos, setTodos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [renderCount, increaseFn] = useRenderCounter();

    useEffect(() => {    
        store.subscribe('TODOS', 'todo-view', (model) => {
            setTodos(model);
        });

        store.subscribe('CATEGORIES', 'todo-view', (model) => {
            setCategories(model);
        });
    }, []);

    const deleteTodo = async (e) => {    
        let id = e.currentTarget.id;    
        const row = parseInt(id.substring(id.indexOf('_') + 1));        
        const copyTodos = [...todos];  

        if(id.indexOf("save") > -1) {
            copyTodos[row].status = "Open";
        }
        else {
            copyTodos.splice(row, 1);            
        }

        store.setModel('TODOS', copyTodos); //update model store 
    };

    const saveTodo = async (e) => {    
        let id = e.currentTarget.id;    
        const row = parseInt(id.substring(id.indexOf('_') + 1));        
        const copyTodos = [...todos];  
        copyTodos[row].status = "Open";
        store.setModel('TODOS', copyTodos); //update model store 
    };

    const addTodo = async (e) => {           
        const newTodo = { title: "New To DO", category: "None", status: "New" };
        const copyTodos = [...todos];  
        copyTodos.push(newTodo);
        store.setModel('TODOS', copyTodos); //update model store                
    };

    const changeTodoName = async (index, newName) => {    
        const copyTodos = [...todos];
        copyTodos[index].title = newName;
        store.setModel('TODOS', copyTodos); //update model store  
    };

    const changeTodoCategory = async (index, newCategory) => {   
        const copyTodos = [...todos];
        copyTodos[index].category = newCategory;
        store.setModel('TODOS', copyTodos); //update model store  
    };

    increaseFn();

	return (
		<div className="view-wrapper">
            <ToDoHeader></ToDoHeader>            

			{todos.length == 0 ?
                <h3>You have nothing in your To Do list</h3> :
                <table className="todo-table">
                    <tbody>
                        <tr>
                            <th>title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>                    

                    {todos.map((todo, i) => {  
                        return (
                            <tr key={i}>
                                <td>
                                    { todo.status == 'New' ? 
                                        <input type="text" id="title_${index}" className="todo-input" value={todo.title} onChange={e => changeTodoName(i, e.target.value)}/> :
                                        <span>{todo.title}</span>
                                    }
                                </td>
                                <td>
                                    { todo.status == 'New' ? 
                                        <select className="todo-select" id={'category' + i} value={todo.category}  onChange={e => changeTodoCategory(i, e.target.value)}>
                                            <option value="none">Select...</option>
                                            {
                                                categories.map((category, i) => {  
                                                    return (
                                                        <option value={category} key={i}>{category}</option>
                                                    ) 
                                                })
                                            }
                                        </select>
                                         :
                                        <span>{todo.category}</span>  
                                    }                                     
                                </td>
                                <td>{todo.status}</td>
                                <td>
                                    { todo.status == 'New' ? 
                                        <button className="action-button" id={'save_' + i} onClick={saveTodo}>Save</button>
                                        :
                                        <button className="action-button" id={'delete_' + i} onClick={deleteTodo}>Delete</button>   
                                    } 
                                </td>
                            </tr>
                        ) 
                    })}
                    </tbody>
                </table> 
            }

            <button className="add-button" id="addTaskButton"  onClick={addTodo}>Add ToDo</button>

            <RenderCounterDisplay renderTitle="ToDoView" renderCount={renderCount} renderStyle={{color: "red", display: "block", fontSize: "10px"}}/>
		</div>
	)
};


export default ToDoView;
