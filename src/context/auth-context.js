import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from './toast-context'

const authContext = createContext(null);

const authInitialState = {
    user: localStorage.getItem("user") ? localStorage.getItem("user") : "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN":
            localStorage.setItem("token", action.payload.encodedToken);
            localStorage.setItem("user", action.payload.createdUser.firstName);
            return {
                ...state,
                user: action.payload.createdUser.firstName,
                token: action.payload.encodedToken
            };

        case "LOGGED_IN":
            localStorage.setItem("token", action.payload.encodedToken);
            localStorage.setItem("user", action.payload.foundUser.firstName);
            return {
                ...state,
                user: action.payload.foundUser.firstName,
                token: action.payload.encodedToken
            };

        case "LOGGED_OUT":
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                user: "",
                token: ""
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [auth, authDispatcher] = useReducer(authReducer, authInitialState);
    const navigate = useNavigate();
    const { successToast, errorToast } = useToast();

    const signUphandler = async (e, userInfo) => {
        e.preventDefault();
        const { name, email, password, confirmpassword, terms } = userInfo;
        if (password !== confirmpassword) {
            errrorToast("Passowords do not match")
            return;
        }
        try {
            const response = await axios.post(`/api/auth/signup`, JSON.stringify({
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                firstName: name,
                terms: terms
            }));
            authDispatcher({ type: "SIGN_IN", payload: response.data });
            successToast("Login successful")
            navigate("/");
        } catch (error) {
            errorToast("Some error occured while during. Please refresh and try again.");
        }

    }

    const loginHandler = async (e, userInfo) => {
        e.preventDefault();
        const { email, password } = userInfo;
        try {
            const response = await axios.post("/api/auth/login", JSON.stringify({
                email: email,
                password: password,
            }))
            authDispatcher({ type: "LOGGED_IN", payload: response.data });
            successToast("Login successfully!")
            navigate("/");
        } catch (error) {
            errorToast("Some error occured while logging in. Please refresh and try again.");
        }
    }

    const logoutHandler = () => {
        authDispatcher({ type: "LOGGED_OUT" });
        successToast("Logout successfully!")
        navigate("/");
    }

    const testUserHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/auth/signup`, {
                "email": "anshul.raheja@gmail.com",
                "password": "1234",
                "confirmpassword": "1234",
                "firstName": "Anshul",
            });
            authDispatcher({ type: "SIGN_IN", payload: response.data });
            successToast("Logged In")
            navigate("/");
        } catch (error) {
            errorToast("Some error occured. Try again!")
        }
    }
    return (
        <authContext.Provider
            value={{ auth, authDispatcher, signUphandler, logoutHandler, loginHandler, testUserHandler }}
        >
            {children}
        </authContext.Provider>
    );
};

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider }




