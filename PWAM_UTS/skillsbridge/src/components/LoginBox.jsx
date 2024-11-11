// src/components/LoginBox.jsx
import React, { useState } from 'react';
import '../styles/LoginBox.css';

function LoginBox() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-box">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">Welcome back! Please log in to access your account.</p>
            <form className="auth-form">
                <input type="email" placeholder="Enter your email" />

                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                    />
                    <label className="show-password">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                        Show Password
                    </label>
                </div>

                <div className="auth-options">
                    <label className="remember-me">
                        <input type="checkbox" />
                        Remember Me
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button className="auth-button">Login</button>

                <div className="or-divider">OR</div>

                <button className="google-button">
                    <img src="/images/google-icon.png" alt="Google Icon" />
                    Login with Google
                </button>
            </form>

            <p className="auth-footer">
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
}

export default LoginBox;