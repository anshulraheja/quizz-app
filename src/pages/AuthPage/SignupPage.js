import './AuthPage.css'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useAuth } from '../../context/auth-context';
const SignupPage = () => {

    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        terms: false
    });

    const { signUphandler, testUserHandler } = useAuth();

    const inputHandler = (e) => {
        if (e.target.type === "checkbox") {
            setSignUpData((signUpData) => ({
                ...signUpData,
                [e.target.name]: e.target.checked,
            }));
        }
        else {
            setSignUpData((data) => ({ ...data, [e.target.name]: e.target.value }));
        }

    };

    return (

        <div>
            <div><section className="login-container">
                <form className="login-form" onSubmit={(e) => signUphandler(e, signUpData)}>
                    <h3 className="login-header">Signup</h3>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="name" placeholder="Name" name="name" onChange={inputHandler} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" name="email" onChange={inputHandler} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" name="password" onChange={inputHandler} required />
                    </div>
                    <div>
                        <label htmlFor="confirmpassword">Confirm Passowrd</label>
                        <input type="password" placeholder="Confirm Passowrd" name="confirmpassword" onChange={inputHandler} required />
                        <div className="login-remember">
                            <span>
                                <input type="checkbox" name="terms" onChange={inputHandler} required />
                                <label htmlFor="terms">I accept all Terms and Conditions</label>
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="login-button">Create New Account</button>
                    <button className="test-button" onClick={testUserHandler}>Test user</button>
                    <Link to="/login" className="login-new_account">Already Have an account? Login</Link>
                </form>
            </section>
            </div>
        </div>
    )
}

export default SignupPage