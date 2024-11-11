
import '../styles/NavBar.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
                                <li><Link to="/home" className="nav-link">Home</Link></li>
                                <li><Link to="/courses" className="nav-link" >Courses</Link></li>
                                <li><Link to="/about" className="nav-link" >About</Link></li>
                                <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                                <li><Link to="/contact" className="nav-link" >Contact</Link></li>
                                <li><Link to="/labs" className="nav-link">Labs</Link></li>
                            </div>

                        </ul>
                    </nav>
                    <div className="mobile-right-header">
                        <div className="auth-buttons">
                            <a href="#" className="btn secondary">Sign Up</a>
                            <Link to="/login" className="btn primary">Login</Link>
                        </div>
                        <a onClick={()=>toggleSideBar(true)} id="hamburger-dropdown"><img src="../../public/logos/hamburger.svg" alt="SidebarDropdown"/></a>
                    </div>
                </div>
            </div>

            {isSideBarOpen && <div className="sidebar-container">
                <ul className="sidebar">
                    <li><a id="sidebar-close" onClick={() => toggleSideBar(false)}><img
                        src="../../public/logos/sidebarX.svg" alt="SideBarClose"/></a></li>
                    <li><Link to="/home" className="nav-link">Home</Link></li>
                    <li><Link to="/courses" className="nav-link">Courses</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><Link to="/pricing" className="nav-link">Pricing</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                    <li><Link to="/labs" className="nav-link">Labs</Link></li>
                </ul>
            </div>}

        </div>
    );
}