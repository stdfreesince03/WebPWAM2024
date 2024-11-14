import './Logout.css'

export default function Logout() {
    return (
        <button className="logout-button" onClick={onLogout}>
            Logout
        </button>
    );
}