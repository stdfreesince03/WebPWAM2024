import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet} from 'react-router-dom'
import '../styles/MainPage.css'

export default function IndexLayout() {
    return (
        <div>
            <NavBar></NavBar>
            <main className="page-content">
                <Outlet/>
            </main>
            <Footer></Footer>
        </div>
    );
}