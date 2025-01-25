import React from "react";
import './home.css';
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/login");
    }

    function handleSignup() {
        navigate("/signup");
    }

    return (
        <div id="home-container">
            <main>
                <h1>Welcome to JobTracker</h1>
                <div className="animation">
                    <p className="typed">Job Application Tracker</p>
                </div>
                <div className="button-container">
                    <button onClick={handleLogin} className="btn btn-primary">Log in</button>
                    <button onClick={handleSignup} className="btn btn-secondary">Sign Up</button>
                </div>
            </main>
            {/* <footer>
                <p>&copy; 2025 JobTracker. All rights reserved.</p>
                <nav>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/contact">Contact Us</a>
                </nav>
            </footer> */}
            <Footer />
        </div>
    );
}

