import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import './LoginBox.css';

export default function LoginBox() {
    const [isInstructor, setIsInstructor] = useState(false);

    const handleToggle = () => {
        setIsInstructor((prev) => !prev);
    };

    return (
        <div className="auth-box">
            <h2 className="auth-title">Login</h2>
            <p className="auth-subtitle">Please log in as {isInstructor ? 'Instructor' : 'Student'}</p>

            <Form
                method="post"
                action={`/login/${isInstructor ? 'instructor' : 'student'}`}
                className="auth-form"
            >
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />

                <div className="auth-options">
                    <label className="toggle-label">
                        <span>{isInstructor ? 'Instructor' : 'Student'}</span>
                        <div className="toggle-switch" onClick={handleToggle}>
                            <div className={`toggle-slider ${isInstructor ? 'active' : ''}`}></div>
                        </div>
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="auth-button">Login</button>
            </Form>

            <div className="or-divider">or</div>
            <button className="google-button">
                <img src="/path-to-google-icon" alt="Google Icon" />
                Login with Google
            </button>

            <div className="auth-footer">
                Don't have an account? <a href="/signup">Sign up</a>
            </div>
        </div>
    );
}