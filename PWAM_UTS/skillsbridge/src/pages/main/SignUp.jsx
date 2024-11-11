// src/pages/SignUpPage.jsx
import React from 'react';
import '../../styles/SignUp.css';

function SignUpPage() {
    return (
        <div className="signup-page-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                <p className="signup-subtitle">Create an account to join us and explore our courses!</p>
                <form className="signup-form">
                    <input type="text" placeholder="Enter your name" className="signup-input" />
                    <input type="email" placeholder="Enter your email" className="signup-input" />
                    <input type="password" placeholder="Create a password" className="signup-input" />
                    <input type="password" placeholder="Confirm your password" className="signup-input" />

                    <div className="signup-options">
                        <label className="terms">
                            <input type="checkbox" /> I agree to the <a href="#">Terms and Conditions</a>
                        </label>
                    </div>

                    <button className="signup-button">Sign Up</button>

                    <div className="or-divider">OR</div>

                    <button className="google-button">
                        <img src="/images/google-icon.png" alt="Google Icon" />
                        Sign Up with Google
                    </button>
                </form>

                <p className="signup-footer">
                    Already have an account? <a href="/login">Log In</a>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;