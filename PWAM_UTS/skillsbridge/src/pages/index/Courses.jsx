import React from 'react';
import '../styles/Courses.css';

export default function Courses() {
    return (
        <main className="container courses-list">
            <div className="course-header">
                <h1>Online Courses on Design and Development</h1>
                <p>Welcome to our online courses page, where you can enhance your skills in design and development.</p>
            </div>
            <div className="course-card">
                <button className="view-course">View Course</button>
                <h2>Web Design Fundamentals</h2>
                <p>Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.</p>
                <div className="course-images">
                    <img src="../../assets/images/CourseWeb_1.png" alt="Web Design Image 1" />
                    <img src="../../assets/images/CourseWeb_2.png" alt="Web Design Image 2" />
                    <img src="../../assets/images/CourseWeb_3.png" alt="Web Design Image 3" />
                </div>
                <div className="course-details">
                    <span>4 Weeks</span>
                    <span>Beginner</span>
                </div>
                <div className="curriculum">
                    <div className="curriculum-item"><h3>01</h3><p>Introduction to HTML</p></div>
                    <div className="curriculum-item"><h3>02</h3><p>Styling with CSS</p></div>
                    <div className="curriculum-item"><h3>03</h3><p>Responsive Design</p></div>
                </div>
            </div>
            {/* Additional course cards as needed */}
        </main>
    );
}