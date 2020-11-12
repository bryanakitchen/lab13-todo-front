import React from 'react';
import request from 'superagent';

export default class Todos extends React.Component {
    state = {
        todos: [],
        choreName: '',
        loading: false,
    }
    
    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request
            .get('https://lab12-todo.herokuapp.com/api/todos')
            .set('Authorization', token);

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const { token } = this.props;
        const { choreName } = this.state;
        
        e.preventDefault();

        this.setState({loading: true});

        const newTodo = {
            chore: choreName,
        }
        
        await request
            .post('https://lab12-todo.herokuapp.com/api/todos')
            .send(newTodo)
            .set('Authorization', token);

        this.setState({loading: false});
        await this.setState({ choreName: '' });

        await this.fetchTodos();

    }

    handleCompletedClick = async (id) => {
        const { token } = this.props;

        await request
            .put(`https://lab12-todo.herokuapp.com/api/todos/${id}`)
            .set('Authorization', token);

        await this.fetchTodos();
    }

    render() {
        const { loading, todos, choreName } = this.state;
        return (
            <div>
                <h3>Here is your To Do List</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add Item 
                        <input 
                        value={choreName}
                        onChange={(e => this.setState({ choreName: e.target.value }))}
                        type="text" />
                    </label>
                    <button>Add</button>
                </form>
                <div className="group">
                {
                    loading 
                    ? 'Loading... Please wait.'
                    : todos.map(todo => <div key={`${todo.chore}${todo.id}${Math.random()}`}> 
                        <p className="todo-item">To Do: {todo.chore}<br />  
                        Status: {todo.completed ? 'Completed' : <button onClick={() => this.handleCompletedClick(todo.id)}>Mark Complete</button>}</p>
                    </div>)
                }
                </div>
            </div>
        )
    }
}

// superagent and componentDidMount
// don't forget to use the handleTOkenChange prop thing from App.js