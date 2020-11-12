import React from 'react';
import request from 'superagent';

export default class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({loading: true});

        const user = await request
            .post('https://lab12-todo.herokuapp.com/auth/signup')
            .send(this.state);

        this.setState({loading: false});

        this.props.handleTokenChange(user.body.token);

        this.props.history.push('/todos')
    }

    render() {
        return (
            <div>
                <h3>This is the SignUp page</h3>
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

// PLAN for this page
// form > labels > inputs (type=password) + button
// using required in input tag - checks validation, right?
    // label display:block
// need state for email and password. add values
// handleSubmit
// for forms, add onchange in inputs
// to save data, we will need superagent. and create a post request.
// first test in postman using heroku url. 
// need a .post and .send

// you can copy and paste finished piece for log in