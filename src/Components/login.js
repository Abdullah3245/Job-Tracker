import React, { useState } from "react";
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import Footer from './footer';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const auth = getAuth(app);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if (userCredentials) {
                
                navigate("/main", { state: { userID: userCredentials.user.uid, displayName: userCredentials.user.displayName } });
            }
            setErrorMessage("");
        } catch (err) {
            console.log(err);
            handleError(err);
        }
    }

    function handleError(e) {
        switch (e.code) {
            case AuthErrorCodes.INVALID_PASSWORD:
                setErrorMessage("Invalid Password. Please try again.");
                setPass(""); // Clear password input field
                break;
            case AuthErrorCodes.INVALID_EMAIL:
                setErrorMessage("Invalid Email Address. Please check your email.");
                setEmail(""); // Clear email input field
                break;
            default:
                setErrorMessage("Error: " + e.code);
                break;
        }
    }

    async function googleLogin() {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google Sign-in successful:", user);
            navigate("/main", { state: { userID: user.uid, displayName: user.displayName } });
        } catch (error) {
            console.error("Google Sign-in error:", error);
            setErrorMessage("Google login failed. Please try again.");
        }
    }

    return (
        <div id="login-container">
            <title>Log in</title>
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="subtitle">Log in to your JobTracker account</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Log In
                    </button>
                </form>
                <div className="divider">
                    <span>or</span>
                </div>
                <button onClick={googleLogin} className="btn btn-google">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon2" />&nbsp;  Continue with Google
                </button>
                <p className="signup-link">
                    New to JobTracker? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Login;

