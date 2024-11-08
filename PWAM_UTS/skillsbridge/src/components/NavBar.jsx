
import '../styles/NavBar.css'
import {useEffect, useState} from "react";

export default function NavBar(){
    const [isSideBarOpen,setSideBarOpen] = useState(false);

    function toggleSideBar(boolValue){
        setSideBarOpen(boolValue);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 595) {
                setSideBarOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="navbar">
            <a href="" className="announcement-link">
                <div className="announcement-bar">
                    Free Courses ✨ Sale Ends Soon, Get It Now ➔
                </div>
            </a>
            <div className="header">
                <div className="header-container">

                    <nav>
                        <ul className="nav-list">
                            <div className="logo">
                                <img src="../../public/logos/logo_main.png" alt="Logo"/>
                            </div>
                            <div className="nav-list nav-links">
                                <li><a href="#" className="nav-link" data-page="home">Home</a></li>
                                <li><a href="#" className="nav-link" data-page="courses">Courses</a></li>
                                <li><a href="#" className="nav-link" data-page="about">About</a></li>
                                <li><a href="#" className="nav-link" data-page="pricing">Pricing</a></li>
                                <li><a href="#" className="nav-link" data-page="contact">Contact</a></li>
                                <li><a href="#" className="nav-link" data-page="lab">Labs</a></li>
                            </div>

                        </ul>
                    </nav>
                    <div className="mobile-right-header">
                        <div className="auth-buttons">
                            <a href="#" className="btn secondary">Sign Up</a>
                            <a href="#" className="btn primary">Login</a>
                        </div>
                        <a onClick={()=>toggleSideBar(true)} id="hamburger-dropdown"><img src="../../public/logos/hamburger.svg" alt="SidebarDropdown"/></a>
                    </div>
                </div>
            </div>

            {isSideBarOpen && <div className="sidebar-container">
                <ul className="sidebar">
                    <li><a id="sidebar-close" onClick={()=>toggleSideBar(false)}><img src="../../public/logos/sidebarX.svg" alt="SideBarClose"/></a></li>
                    <li><a href="#" data-page="home">Home</a></li>
                    <li><a href="#" data-page="courses">Courses</a></li>
                    <li><a href="#" data-page="about">About</a></li>
                    <li><a href="#" data-page="pricing">Pricing</a></li>
                    <li><a href="#" data-page="contact">Contact</a></li>
                    <li><a href="#" data-page="lab">Labs</a></li>
                </ul>
            </div>}

        </div>
    );
}