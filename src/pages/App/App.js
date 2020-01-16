import React, {Component} from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import * as todoAPI from '../../services/todos-api';
import AddTodo from '../../pages/AddTodo/AddTodo';
import TodoList from '../../pages/TodoList/TodoList';
import EditTodo from '../../pages/EditTodo/EditTodo';

class App extends Component {
  state = {
    todos: []
  };

  handleAddTodo = async newTodoData => {
    const newTodo = await todoAPI.create(newTodoData);
    this.setState(state => ({
      todos: [...state.todos, newTodo]
    }), () => this.props.history.push('/'));
  }
  
  handleDeleteTodo= async id => {
    await todoAPI.deleteOne(id);
    this.setState(state => ({
      todos: state.todos.filter(t => t._id !== id)
    }), () => this.props.history.push('/'));
  }

  handleUpdateTodo = async updatedTodoData => {
    const updatedTodo = await todoAPI.update(updatedTodoData);
    const newTodosArray = this.state.todos.map(t => 
      t._id === updatedTodo._id ? updatedTodo : t
    );
    this.setState(
      {todos: newTodosArray},
      () => this.props.history.push('/')
    );
  }

  async componentDidMount() {
    const todos = await todoAPI.getAll();
    this.setState({todos});
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          Todo List
        <nav>
          <NavLink exact to='/'>Todos</NavLink>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <NavLink exact to='/add'>Add Todo</NavLink>
        </nav>
        </header>
        <main>
        <Route exact path='/' render={({history}) => 
            <TodoList
              todos={this.state.todos}
              handleDeleteTodo={this.handleDeleteTodo}
            />
        } />

        <Route exact path='/add' render={() => 
            <AddTodo
              handleAddTodo = {this.handleAddTodo}
            />
        } />

        <Route exact path='/edit' render={({history, location}) => 
            <EditTodo
              handleUpdateTodo={this.handleUpdateTodo}
              location={location}
            />
        } />
        </main>
      </div>
    );
  }
}

export default App;
