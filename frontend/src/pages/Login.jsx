import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await API.post("/api/auth/login", { email, password });
            navigate("/dashboard");
        } catch (err) {
            const data = err.response?.data;
            if (data?.errors && data.errors.length > 0) {
                setError(data.errors[0].msg);
            } else {
                setError(data?.message || "Login failed");
            }
        }
    };

    return (
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.brand}>
                    Short <span style={s.brandAccent}>Your URL</span>
                </div>
                <div style={s.sub}>
                    Sign in to manage your links and view analytics.
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={s.field}>
                        <label style={s.label}>Email</label>
                        <input
                            style={s.input}
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Password</label>
                        <input
                            style={s.input}
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={s.btn}>Sign In</button>
                </form>

                {error && <div style={s.error}>{error}</div>}

                <div style={s.sep} />
                <div style={s.foot}>
                    No account yet?{" "}
                    <Link to="/register" style={s.link}>Register</Link>
                </div>
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 16px",
        background: "#09090f"
    },
    card: {
        width: "100%",
        maxWidth: "380px",
        background: "#0f0f17",
        border: "1px solid #252535",
        borderRadius: "12px",
        padding: "36px 32px 30px"
    },
    brand: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#e4e3ef",
        letterSpacing: "-0.4px",
        marginBottom: "4px"
    },
    brandAccent: { color: "#6366f1" },
    sub: {
        fontSize: "13px",
        color: "#6b6880",
        marginBottom: "28px",
        lineHeight: "1.6"
    },
    field: { marginBottom: "14px" },
    label: {
        display: "block",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.6px",
        textTransform: "uppercase",
        color: "#35334a",
        marginBottom: "6px"
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        background: "#09090f",
        border: "1px solid #252535",
        borderRadius: "8px",
        color: "#e4e3ef",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        outline: "none",
        boxSizing: "border-box"
    },
    btn: {
        width: "100%",
        padding: "11px",
        marginTop: "6px",
        background: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer"
    },
    error: {
        marginTop: "14px",
        padding: "10px 12px",
        background: "#f8717110",
        border: "1px solid #f8717120",
        borderRadius: "7px",
        color: "#f87171",
        fontSize: "13px"
    },
    sep: {
        height: "1px",
        background: "#1c1c28",
        margin: "22px 0"
    },
    foot: {
        textAlign: "center",
        fontSize: "12px",
        color: "#6b6880"
    },
    link: {
        color: "#6366f1",
        textDecoration: "none",
        fontWeight: "500"
    }
};

export default Login;