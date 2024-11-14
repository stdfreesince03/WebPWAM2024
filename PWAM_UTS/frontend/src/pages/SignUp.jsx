import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import { Form } from "react-router-dom";
import api from '../services/axios.js';

function SignUpPage() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isInstructor, setIsInstructor] = useState(false);

    const handleToggle = () => {
        setIsInstructor((prev) => !prev);
    };

    async function handleSignup(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const firstName = formData.get('first_name').trim();
        const lastName = formData.get('last_name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const role = isInstructor ? 'instructor' : 'student';

        try {
            const { data } = await api.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                role,
            });

            if (data.user) {
                console.log('Signup Successful');
                navigate('/');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    return (
        <div className="signup-page-container">
            <div className="signup-box">
                <h2 className="signup-title">Sign Up</h2>
                <p className="signup-subtitle">Create an account to join us and explore our courses!</p>

                <Form className="signup-form" onSubmit={handleSignup}>
                    <input type="text" name="first_name" placeholder="Enter your first name" className="signup-input" required />
                    <input type="text" name="last_name" placeholder="Enter your last name" className="signup-input" required />
                    <input type="email" name="email" placeholder="Enter your email" className="signup-input" required />
                    <input type="password" name="password" placeholder="Create a password" className="signup-input" required />
                    <input type="hidden" name="role" value={isInstructor ? 'instructor' : 'student'} />

                    <div className="signup-options">
                        <label className="terms">
                            <input type="checkbox" required /> I agree to the <a href="#">Terms and Conditions</a>
                        </label>
                    </div>

                    <div className="role-toggle">
                        <label className="role-label">
                            <span>{isInstructor ? 'Instructor' : 'Student'}</span>
                            <div className="toggle-switch" onClick={handleToggle}>
                                <div className={`toggle-slider ${isInstructor ? 'active' : ''}`}></div>
                            </div>
                        </label>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="signup-button">Sign Up</button>

                    <div className="or-divider">OR</div>

                    <button className="google-button">
                        <img src="/logos/OAuth.png" alt="Google Icon" id="google-oauth-icon" />
                        Sign Up with Google
                    </button>
                </Form>

                <p className="signup-footer">
                    Already have an account? <a href="/src/pages/Login">Log In</a>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;