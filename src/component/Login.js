import React, { Component } from 'react';
import AuthService from "../services/auth.service";
import CheckButton from 'react-validation/build/button'
import { useNavigate } from 'react-router-dom';


const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger">
                This field is required!
            </div>
        )
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
        this.authService = new AuthService();
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleLogin = async (e) => { // Added 'async' keyword here
        e.preventDefault();
        const { username, password } = this.state;
        try {
            const response = await this.authService.login(username, password); // Call login function from authService
            console.log('Login successful:', response);
            localStorage.setItem("user",username);
            this.setState({ isLoggedIn: true, loading: false });
            this.props.onLoginSuccess();
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, e.g., display an error message to the user
        }
    };

    render() {
        const { username, password, loading, message } = this.state;
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleLogin}>
                    <input type="text" value={username} onChange={this.onChangeUsername} placeholder="Username" />
                    <input type="password" value={password} onChange={this.onChangePassword} placeholder="Password" />
                    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        );
    }
}

