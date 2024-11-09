import '../../styles/Lab.css'

export default function Lab() {
    return(
        <div className="lab-page">
            <header className="lab-header">
                <h1>Explore Virtual Labs</h1>
                <p>Hands-on virtual labs designed to help you learn and practice new skills in a simulated environment.</p>
            </header>

            <div className="lab-grid">
                <div className="lab-card">
                    <img src="/images/lab1.png" alt="Lab 1" className="lab-image"/>
                        <div className="lab-info">
                            <h2>Car Jump</h2>
                            <p>Jump!!!</p>

                            <a href="#" className="btn visit-lab">Start Lab</a>
                        </div>
                </div>
            </div>
        </div>
    );
}