import React from 'react';
import './TodoList.css';
import TodoPanel from '../../components/TodoPanel/TodoPanel';

function TodoList(props) {
    return (
        <>
            <h1>Todo List</h1>
            <div className="TodoList-grid">
                {props.todos.map(todo =>
                    <TodoPanel 
                        key={todo._id}
                        todo={todo}
                        handleDeleteTodo={props.handleDeleteTodo}
                    />
                )}
            </div>
        </>            
    );
}

export default TodoList;