import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await API.post("/api/auth/logout");
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <span style={styles.brand}>⚡ ShortURL</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "#1e1e2e",
        color: "white",
        width: "100%",
        boxSizing: "border-box"
    },
    brand: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#a78bfa"
    },
    btn: {
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    }
};

export default Navbar;