import React from 'react';
import request from 'superagent';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({loading: true});

        const user = await request
            .post('https://lab12-todo.herokuapp.com/auth/signin')
            .send(this.state);

        this.setState({loading: false});

        this.props.handleTokenChange(user.body.token);

        this.props.history.push('/todos')
    }
    
    render() {
        return (
            <div>
                <h3>This is the Login page</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                        <input 
                        onChange={(e => this.setState({ email: e.target.value }))}
                        type="email" required />
                    </label>
                    <label>
                        Password
                        <input 
                        onChange={(e => this.setState({ password: e.target.value }))}
                        type="password" required />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
