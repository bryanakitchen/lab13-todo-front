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

    handleCompletedClick = async (id) => {
        const { token } = this.props;

        await request
            .put(`https://lab12-todo.herokuapp.com/api/todos/${id}`)
            .set('Authorization', token);

        await this.fetchTodos();
    }

    render() {
        const { loading, todos } = this.state;
        return (
            <div>
                <h3>Here is your ToDo List</h3>
                {
                    loading 
                    ? 'Loading... Please wait.'
                    : todos.map(todo => <div key={`${todo.chore}${todo.id}${Math.random()}`}> 
                        <p className="todo-item">Chore: {todo.chore}<br />  
                        Status: {todo.completed ? 'Completed' : <button onClick={() => this.handleCompletedClick(todo.id)}>Mark Complete</button>}</p>
                    </div>)
                }

            </div>
        )
    }
}

// superagent and componentDidMount
// don't forget to use the handleTOkenChange prop thing from App.js