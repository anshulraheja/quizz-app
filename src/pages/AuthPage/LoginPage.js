import './AuthPage.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth-context';
const LoginPage = () => {

    const [loginData, setloginData] = useState({
        email: "",
        password: "",
    });

    const { loginHandler } = useAuth();

    const inputHandler = (e) => {
        if (e.target.type === "checkbox") {
            setloginData((loginData) => ({
                ...loginData,
                [e.target.name]: e.target.checked,
            }));
        }
        else {
            setloginData((data) => ({ ...data, [e.target.name]: e.target.value }));
        }

    };
    return (
        <div>
            <section className="login-container">
                <form className="login-form" onSubmit={(e) => loginHandler(e, loginData)}>
                    <h3 className="login-header">Login</h3>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="admin@gmail.com" id="email" onChange={inputHandler} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="admin123" id="password" onChange={inputHandler} required />

                        <div className="login-remember">
                            <span>
                                <input type="checkbox" id="rememberme" name="rememberme" onChange={inputHandler} />
                                <label htmlFor="rememberme">Remember me</label>
                            </span>
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                    <button className="login-button" type="submit">Login</button>
                    <Link to="/signup" className="login-new_account" >Create New Account</Link>
                </form>
            </section>
        </div>
    )
}

export default LoginPage