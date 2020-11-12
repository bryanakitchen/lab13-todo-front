import React from 'react';
import request from 'superagent';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
        err: null,
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({loading: true});

        try {

            const user = await request
            .post('https://lab12-todo.herokuapp.com/auth/signin')
            .send(this.state);

            this.setState({loading: false, err: null });
    
            this.props.handleTokenChange(user.body.token);
    
            this.props.history.push('/todos')
        } catch(err) {
            this.setState({err: 'Email or Password Invalid'});
            // throw err;
        };

    }
    
    render() {
        return (
            <div>
                <h3>This is the Login page</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        {this.state.err && <div style={{ color: 'red'}}>{this.state.err}</div>}
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
