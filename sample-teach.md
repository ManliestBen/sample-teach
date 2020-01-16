# Ben Manley - Sample Teach
# Full-stack MERN Todo List App

## Objectives:

- Create a full-stack MERN application
- Develop a code-writing rhythm to assist in understanding the flow between the front-end and back-end of the application.

## Objective Path:

- View the working application
- Code towards testable break points
- Summaries of tech used
- Basic structure setup
- Set up server
- Set up basic React page
- Create/test 'Add' functionality
- Do the same for 'List,' 'Delete,' and 'Edit' functionality

## MERN Overview:

- M - MongoDB: Document-based open source database
- E - Express.js: Fast, unopinionated, minimalist web framework for Node.js
- R - React: JavaScript library for building User Interfaces
- N - Node.js: Asynchronous, event-driven JavaScript runtime

## Application Objectives:
- Show a list of todo items
- Allow navigation to a page to add todo items
- Allow a todo item to be edited
- Allow a todo item to be deleted

___
## Basic Setup / Dependencies:
- Navigate to the parent folder of the app you'd like to create and use create-react-app to create the app's bones

```js
npx create-react-app mern-todo
```

### We need to add some dependencies to use in the app:
- express - Our web framework
- mongoose - Our database
- morgan - Error logging
- nodemon - Auto-start tool for running the server
- react-router-dom - Allows the use of routing within React
- serve-favicon - Fix for React app icon

To add these dependencies, use npm install:

```js
npm install express mongoose morgan nodemon react-router-dom serve-favicon
```
Navigate to the index.html file and change the name of the app to something useful.

Let's also toss in a link to Bootstrap inside our index.html file for simple styling and access to panels, which we'll use later:

```js
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

## TEST CODE:
Fire up the app and check to make sure you get a browser window with a fresh, new React application.

##  Time for a commit!
________

## Create directory structure

Since the app will contain both the back and front ends, we'll need to manipulate the directory structure to keep things organized.

In the parent direcory, create the following directories:
- config
- controllers
- routes
- models

Inside the src directory, create the following directories:
- pages
- services
- components

This sets us up with an outline of where the appropriate app files will be stored.

___

## Set up the server and database

### Express server setup:
Create a server.js file and let's start writing some code!

```js
var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');

require('./config/database'); // Requiring our database 

var app = express();

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));


// route to catch all (this must come AFTER any API routes)
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001; // Setting the port to 3001.  Our front-end will be using port 3000.

app.listen(port, function() {
  console.log(`Express app listening on port ${port}`);
});
```

We need to add a proxy in the package.json file so that our API requests get sent to the back end properly.  Add a new line to the bottom of the code with the proxy for the Express server we just set up.

```js
"browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:3001" //This is the line to add.
}
```
### Database setup:
Create a database.js file inside the config folder.  For this application, we'll be setting it up for a local database, not using the cloud.

```js
var mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/todos',
  { useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

var db = mongoose.connection;

db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`); // This allows us to see when a connection has been made to the database
});
```
### Create a build to avoid favicon errors, then we'll test everything:

```js
npm run build
```

## TEST
When you start up the server, you should see:
- "Express app listening on port 3001"
- "Connected to MongoDB at localhost:27017"

## Time for a commit!

## Reorganize Front-End / Add CSS:

To neaten up our React files, we're going to put the App.js and App.css files inside their own directory.  Create a directory inside the 'pages' directory called 'App' and move the two files over.

**Be sure to update the index.js file with the new location of your App.js file!**
We also need to add a Router to the index.js file so we're able to use Route/Link functionality along with history:

```js
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
      <Route render={({history}) => <App history={history} />} />
    </Router>, document.getElementById('root'));
```

After making this update, let's put some basic CSS in the index.css:

```
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

:root {
  --black: #07020D;
  --accent: #5DB7DE;
  --background: #F1E9DB;
  --secondary: #A39B8B;
  --secondary-dark: #716A5C;
}

a {
  color: var(--accent);
  padding: 1vmin;
  border-radius: 1vmin;
  text-decoration: none !important;
}

a:hover {
  color: var(--black);
  background-color: var(--accent);
}

a.active {
  color: var(--background);
  background-color: var(--black);
  cursor: default;
}

dl {
  margin-bottom: 0;
}

.margin-left-10 {
  margin-left: 10px;
}
```

A little more CSS in App.css:

```js
.App {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 7vmin auto;
}

.App-header {
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vmin;
  font-size: 2.5vmin;
  color: var(--background);
}

.App main {
  background-color: var(--background);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.App main h1 {
  color: var(--secondary-dark);
  margin-bottom: 5vmin;
}
```

Now that the style stuff is out of the way, let's get down to making the app functional.
___

## Setting up App.js
Clear out the contents of App.js.  We're going to write our own class component.  
___
## Question:
Why use a class component instead of a function component?
___

Import all the things you'll need, add some state, and a couple NavLinks to let us move between pages.

```js
import React, {Component} from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';

class App extends Component {
  state = {
    todos: []
  };

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

        </main>
      </div>
    );
  }
}

export default App;
```

## TEST
Fire up the app using npm start and you should see the Nav bar, two links, and they should take you between / and /add when clicked.

## Added/Tested functionality = Commit!!!

___

## Configure a page to Add a todo via a form
This marks the start of a cycle we repeat 3 additional times during this app.  Familiarizing yourself with patterns while writing code will help you learn it much more quickly.

### AddTodo page
Inside the 'pages' directory, create a directory named 'AddTodo' and within it, create AddTodo.jsx.

This is the form we'll be using to submit a new todo via our API to the back end.

We're going to write the class component and include functions for handleSubmit and handleChange, which we will define immediately afterwards.

```js
import React, {Component} from 'react';

class AddTodo extends Component {
    state = {
        invalidForm: true,
        formData: {
            title: '',
            details: 'Details'
        }
    };

    formRef = React.createRef();

    render() {
        return (
            <> 
            <h1>Add Todo</h1>
            <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>Todo</label>
                    <input
                        className='form-control'
                        name='title'
                        value={this.state.formData.title}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Details</label>
                    <input
                        className='form-control'
                        name='details'
                        value={this.state.formData.details}
                        onChange={this.handleChange}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='btn'
                    disabled={this.state.invalidForm}
                >
                    Add Todo
                </button>
            </form>
            </>
        );
    }
}

export default AddTodo;
```

Now, we can add handleSubmit and handleChange functions:

```js
handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddTodo(this.state.formData);
};

handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
};
  ```

Because we're calling handleAddTodo that's attached to props, we need to go back to App.js and define it.

Don't forget to import it into the file first!
```js
import AddTodo from '../../pages/AddTodo/AddTodo';
```

Now, we write the function that handles adding a todo by sending our data to the back end via our API.

```js
handleAddTodo = async newTodoData => {
    const newTodo = await todoAPI.create(newTodoData);
    this.setState(state => ({
      todos: [...state.todos, newTodo]
    }), () => this.props.history.push('/'));
}
```

...and then pass it to the component, which we'll set up in a Route for use with the NavLink we coded earlier.

```js
<Route exact path='/add' render={() => 
    <AddTodo
        handleAddTodo = {this.handleAddTodo}
    />
} />
```

___
## Question:
What is the next logical part we need to code?
___

## Coding the API
We're calling an API that we haven't defined yet.  Let's do that!

In the src/services directory, create a file 'todos-api.js'

Before we forget, let's import our API in App.js:

```js
import * as todoAPI from '../../services/todos-api';
```

Now, let's write the function that our API will use to send data to our Express server, which will create our todo.

```js
export function create(todo) {
    return fetch('/api/todos', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(todo)
    }).then(res => res.json());
}
```
___
## Back to the Back End
In order for our request to be routed correctly, we need to configure the router in our server.js file.

Let's define the router using:

```js
var todosRouter = require('./routes/api/todos');
```

We'll go write the route shortly.  Before we do that, we need to tell the app to use this router when it recieves requests to 'api/todos.'  This is done directly before our catch-all route:

```js
app.use('/api/todos', todosRouter);
```

Next, we need to write the code for the router:  
- Inside the 'routes' directory, create a directory named 'api' and create 'todos.js' inside of it.

While we're creating files, let's create our controller and model as well.
- Inside the 'controllers' directory, add a directory called 'api' and create 'todos.js' inside it.
- Inside the 'models' directory, create a file called 'todo.js' inside it.

## Coding the Router / Controller / Model:

The code for our router (that lives in 'routes/api') will send the request from the API to the controller.

```js
var express = require('express');
var router = express.Router();
var todosCtrl = require('../../controllers/api/todos');

router.post('/', todosCtrl.create);

module.exports = router;
```

Now, we move over to the controller, which will perform our requests using the Model in MongoDB.

(We'll code the model in the step directly after this.)

```js
const Todo = require('../../models/todo');

module.exports = {
    create
};

async function create(req, res) {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
}
```

Defining our model is the last step in allowing us to add a todo into the database using our full-stack MERN app.  

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: {type: String, required: true},
    details: {type: String, default: 'Details'}
},{
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);
```
PHEW!!!  So many steps!  It only gets easier from here however, as we've got the structure set up and will just need to add functions for the remaining CRUD operations.
___
## TEST

Split your terminal into two windows.  Fire up your server in one using nodemon:
```js
nodemon server
```
In the second terminal, start the React app:
```js
npm start
```

You should be able to navigate to the Add page, populate the relevant data, and hit the 'Submit' button.  When you do so, you should notice 'POST /api/todos 201' in the console of the terminal running your server.

## Time to COMMIT!!!!

___
## List of Todos
Now that we can successfully add items to our database, let's write some code so that we're able to list them on a page.

- In 'pages' add a directory named 'TodoList' and create 'TodoList.jsx' inside it.  Also, create 'TodoList.css' inside it.

Let's set up some minimal CSS to separate our todo items:

```js
.TodoList-grid {
  width: 80%;
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(170px, 1fr));
  grid-gap: 20px;
}
```

We're going to be using Bootstrap to make panels for each of our todo items.  We'll put the panel inside of the 'components' directory.  
- Create a directory inside of the 'components' directory named 'TodoPanel' and create 'TodoPanel.jsx' inside of it.

This is a simple function component Bootstrap panel that will display the title and details of each todo item.

```js
import React from 'react';

function TodoPanel({todo}) {
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

            </div>
        </div>
    );
}

export default TodoPanel;
```

Now that we've got our panel, let's go add it to the TodoList page.  We also need to map the props so that each todo is it's own panel.

```js
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
                    />
                )}
            </div>
        </>            
    );
}

export default TodoList;
```

Next, let's add our TodoList to App.js.  We'll set this up with a Route as well. (Don't forget to import TodoList at the top of the file!)


```js
import TodoList from '../../pages/TodoList/TodoList';
```
```js
<Route exact path='/' render={({history}) => 
    <TodoList
        todos={this.state.todos}
    />
} />
```

In order to populate state with our todo list, we need to set up an async componentDidMount function.  This will use our API to get all todos from the database.

```js
async componentDidMount() {
    const todos = await todoAPI.getAll();
    this.setState({todos});
}
```

Now we follow the same path as last time:
- Code the API function
- Code the route
- Code the controller

Coding the API function: 

```js
export function getAll() {
    return fetch('/api/todos')
    .then(res => res.json());
}
```

Coding the route:

```js
router.get('/', todosCtrl.index);
```

Coding the controller:
```js

module.exports = {
    create,
    index  // Don't forget to add this!!!
};

async function index(req, res) {
    const todos = await Todo.find({});
    res.status(200).json(todos);
}
```

Now, when the App component mounts, all of the todo data is pulled from the database via the API and displayed on the screen!  

## TEST

Play around with adding todo items to confirm that everything is working properly.

## COMMIT, COMMIT, COMMIT!!!

___
## Deleting Items
To add delete functionality, we're going to follow the exact same steps as before.  We'll start with a simple button, which we add to the footer of our Bootstrap panel:

```js
<button
    className='btn btn-xs btn-danger margin-left-10'
    onClick={() => handleDeleteTodo(todo._id)}
>
    Delete
</button>
```

**Don't forget to pass the function into the component!**

```js
function TodoPanel({todo, handleDeleteTodo}) {
    ...
```

Now we'll need to pass the function back two times:
- Pass it back once to TodoPanel:

```js
<TodoPanel 
    key={todo._id}
    todo={todo}
    handleDeleteTodo={props.handleDeleteTodo}
/>
```

- Pass it back a second time to TodoList in App.js:
```js
<Route exact path='/' render={({history}) => 
    <TodoList
        todos={this.state.todos}
        handleDeleteTodo={this.handleDeleteTodo}
    />
} />
```

Now that we've passed it all the way back, let's write the darn function!!!

```js
handleDeleteTodo= async id => {
    await todoAPI.deleteOne(id);
    this.setState(state => ({
      todos: state.todos.filter(t => t._id !== id)
    }), () => this.props.history.push('/'));
}
```
___
## Question:
What is the next step we should take?
___

Start with the API:

```js
export function deleteOne(id) {
    return fetch(`${'/api/todos'}/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
}
```

Then the route:

```js
router.delete('/:id', todosCtrl.delete);
```

Then the controller:

```js
async function deleteOne(req, res) {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedTodo);
}
```

## TEST
Try everything out.  You should now be able to add and delete todo items.

## DON'T QUIT, JUST COMMIT!!!!

___

## Edit/Update Functionality:
The last piece of the puzzle is being able to edit and update existing todo items.
First, let's put an icon in the footer of our panel:
**(Don't forget to import Link)**

```js
import {Link} from 'react-router-dom';

.
.
.

<Link
    className='btn btn-xs btn-warning'
    to={{
        pathname: '/edit',
        state: {todo}
    }}
>
    Edit
</Link>
```

Next, we'll create a page for the user to do this.

The page will auto-populate todo information based on history and location.

Create a new directory in 'pages' called 'EditTodo' and create 'EditTodo.jsx' inside it.

Most of the code is identical to the Add page, the only difference is where we use location to get specific todo data when setting state.


```js
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EditTodo extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.todo
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateTodo(this.state.formData);
    };
    
    handleChange = e => {
       const formData = {...this.state.formData, [e.target.name]: e.target.value};
       this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
       });
    };

    render() {
        return (
            <>
                <h1>Edit Todo</h1>
                <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Todo</label>
                        <input
                            className="form-control"
                            name="title"
                            value={this.state.formData.title}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Details</label>
                        <input
                            className="form-control"
                            name="details"
                            value={this.state.formData.details}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-xs"
                        disabled={this.state.invalidForm}
                    >
                        Save
                    </button>
                    <Link to='/'>Whoops</Link>
                </form>

            </>
        );
    }
}

export default EditTodo;
```

Let's write the handleUpdateTodo function that we just called.

```js
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
```
___
## Question:
What two other pieces of code do we need to write before we leave App.js to start coding the API?
___


Import EditTodo to App.js and pass the handleUpdateTodo function to the EditTodo component!

```js
import EditTodo from '../../pages/EditTodo/EditTodo';
.
.
.
<Route exact path='/edit' render={({history, location}) => 
    <EditTodo
        handleUpdateTodo={this.handleUpdateTodo}
        location={location}
    />
} />

```

## One last rep
For the final time, we'll follow the same flow and finish coding the Edit/Update functionality:

The API:

```js
export function update(todo) {
    return fetch(`${'/api/todos'}/${todo._id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(todo)
    }).then(res => res.json());
}
```

Then the route:

```js
router.put('/:id', todosCtrl.update);
```

Finally, the controller:

```js
async function update(req, res) {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedTodo);
}
```

We now have full CRUD functionality on a full-stack MERN app!

## DON'T FORGET YOUR LAST COMMIT!!!