import './styles/App.css'
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/index/HomePage.jsx";
import './styles/Page.css'

function App() {

  return (
    <>
        <NavBar>

        </NavBar>
        <div className="page-content">
            <HomePage></HomePage>
        </div>

    </>
  )
}

export default App
