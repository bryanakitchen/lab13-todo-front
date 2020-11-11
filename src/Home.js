import React from 'react';
import Link from 'react-router-dom';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    { this.state.token && <div>Welcome, User!</div> }
                    { this.state.token && <Link to="/todos"><div>ToDos</div></Link> }
                    <Link to="/login"><div>Log In</div></Link>
                    <Link to="/signup"><div>Sign Up</div></Link>
                    <button onClick={() => this.handleTokenChange('')}>logout</button>
                </ul>
            </div>
        )
    }
}
