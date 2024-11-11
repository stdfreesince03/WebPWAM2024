// eslint-disable-next-line no-unused-vars
import React from 'react';
import BackNav from "../components/BackNav/BackNav.jsx";
import {Outlet} from "react-router-dom";

const LabLayout = () => {
    const labLayoutStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    };

    const labContentStyle = {
        flex: 1,
        paddingTop: '3rem', // Space for the fixed navbar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (
        <div style={labLayoutStyle}>
            <BackNav/>
            <main className={labContentStyle}>
                <Outlet/>
            </main>
        </div>
    );
};



export default LabLayout;