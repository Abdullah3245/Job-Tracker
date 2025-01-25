import React, { useState, useEffect } from "react";
import './signup.css';
import Footer from "./footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app } from '../firebase';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [authentication, setAuthentication] = useState(false);
    var [user, setUser] = useState();
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
            });

            await user.reload();
            console.log("Account created with display name:", user.displayName);

            setErrorMessage("");
            setAuthentication(true);
        } catch (err) {
            console.log(err);
            handleError(err);
        }
    };

    function handleError(error) {
        if (error.code === "auth/email-already-in-use") {
            setErrorMessage("User already exists. Please log in.");
        } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Invalid email format. Please check your email.");
        } else if (error.code === "auth/weak-password") {
            setErrorMessage("Password is too weak. Please use a stronger password.");
        } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }

    async function googleSignUp() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google Sign-in successful:", user.displayName || user.email);
            navigate("/main", { state: { userID: user.uid, displayName: user.displayName } });
        } catch (error) {
            console.error("Google Sign-in error:", error);
            setErrorMessage("Google login failed. Please try again.");
        }
    }

    if (authentication) {
        return <Navigate to="/main" state={{ userID: auth.currentUser.uid, displayName: auth.currentUser.displayName }} />;
    }

    return (
        <div id="signup-container">
            <div className="signup-card">
                <h1>Create Account</h1>
                <p className="subtitle">Join JobTracker and start managing your job applications</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
                <div className="divider">
                    <span>or</span>
                </div>
                <button onClick={googleSignUp} className="btn btn-google">
                    <FontAwesomeIcon icon={faEnvelope} />&nbsp;  Continue with Google
                </button>
                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;

