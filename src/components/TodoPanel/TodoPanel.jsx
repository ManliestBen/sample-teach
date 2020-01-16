import React from 'react';
import {Link} from 'react-router-dom';

function TodoPanel({todo, handleDeleteTodo}) {
    return(
        <div className='panel panel-default'>
            <div className="panel-heading">
                <h3 className='panel-title'>{todo.title}</h3>
            </div>
            <div className='panel-body'>
                <dl>
                    <dt>Details</dt>
                    <dd>{todo.details}</dd>
                </dl>
            </div>
            <div className='panel-footer'>
            <Link
                className='btn btn-xs btn-warning'
                to={{
                    pathname: '/edit',
                    state: {todo}
                }}
            >
                Edit
            </Link>
            <button
                className='btn btn-xs btn-danger margin-left-10'
                onClick={() => handleDeleteTodo(todo._id)}
            >
                Delete
            </button>
            </div>
        </div>
    );
}

export default TodoPanel;