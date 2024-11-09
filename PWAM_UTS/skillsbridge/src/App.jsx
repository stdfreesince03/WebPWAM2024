import './styles/App.css'
import NavBar from "./components/NavBar.jsx";
import './styles/Page.css'
import Footer from "./components/Footer.jsx";
import Home from "./pages/main/Home.jsx";




function App() {

  return (
    <>
        <NavBar></NavBar>
        <div className="page-content">
            {/*<Lab></Lab>*/}
            {/*<Pricing></Pricing>*/}
            <Home></Home>
        </div>
        <Footer></Footer>
    </>
  )
}

export default App
