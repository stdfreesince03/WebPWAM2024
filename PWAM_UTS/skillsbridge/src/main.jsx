import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout.jsx";
import Home from "./pages/main/Home.jsx";
import About from "./pages/main/About.jsx";
import Contact from "./pages/main/Contact.jsx";
import Lab from "./pages/main/Lab.jsx";
import Courses from "./pages/main/Courses.jsx";
import Pricing from "./pages/main/ Pricing.jsx";
import LabLayout from "./layouts/LabLayout.jsx";
import LabGame from "./pages/lab/LabGame.jsx";
import LoginPage from './pages/main/Login.jsx';
import SignUpPage from "./pages/main/SignUp.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<IndexLayout/>,
        children:[
            {path:"",element:<Home/>},
            {path:"home",element:<Home/>},
            {path:"courses",element:<Courses/>},
            {path:"about",element:<About/>},
            {path:"contact",element:<Contact/>},
            {path:"pricing",element:<Pricing/>},
            {path:"labs",element:<Lab/>}
        ]
    },
    {
        path: "labs",  // Route with parameter to access individual labs
        element: <LabLayout />,
        children:[
            {path:":labID",element:<LabGame/>},
        ]

    },
    {
        path:"login",
        element: <IndexLayout/>,
        children:[
            {path:"",element:<LoginPage/>},
        ]
    },
    {
        path:"signup",
        element: <IndexLayout/>,
        children:[
            {path:"",element:<SignUpPage/>},
        ]
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
