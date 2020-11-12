import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import Todos from './Todos.js';
import Login from './Login.js'
import SignUp from './SignUp.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = { token: localStorage.getItem('TOKEN') || '' }

  handleTokenChange = (myToken) => {
    this.setState({ token: myToken });
    localStorage.setItem('TOKEN', myToken);
  }

  render() {
    return (
      <div>
        <Router>
          <ul>
            { this.state.token && <div>Welcome, User!</div> }
            { this.state.token && <Link to="/todos"><div>To Do List</div></Link> }
            <Link to="/login"><div>Log In</div></Link>
            <Link to="/signup"><div>Sign Up</div></Link>
            <button onClick={() => this.handleTokenChange('')}>Logout</button>
          </ul>
          <Switch>
            <Route 
                path="/" 
                exact
                render={(routerProps) => <Home {...routerProps} />} 
            />
            <Route exact path='/login' render={(routerProps) => <Login 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            <Route 
            exact path='/signup' 
              render={(routerProps) => <SignUp 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <PrivateRoute 
              exact 
              path='/todos' 
              token={this.state.token} 
              render={(routerProps) => <Todos 
              {...routerProps} token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}