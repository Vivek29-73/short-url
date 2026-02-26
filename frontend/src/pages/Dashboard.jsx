import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import UrlCard from "../components/UrlCard";

function Dashboard() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUrls = async () => {
        try {
            const res = await API.get("/api/url/myurls");
            setUrls(res.data);
        } catch (err) {
            if (err.response?.status === 401) navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUrls(); }, []);

    const handleDelete = (deletedId) => {
        setUrls(prev => prev.filter(u => u._id !== deletedId));
    };

    const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
    const activeCount = urls.filter(u =>
        !u.expiresAt || new Date() < new Date(u.expiresAt)
    ).length;
    const expiredCount = urls.length - activeCount;

    return (
        <div style={s.page}>
            <Navbar />
            <div style={s.body}>

                <div style={s.header}>
                    <div style={s.title}>Dashboard</div>
                    <div style={s.sub}>Manage and track all your short links</div>
                </div>

                {/* Stats */}
                <div style={s.stats}>
                    <div style={s.stat}>
                        <div style={s.statLabel}>Total Links</div>
                        <div style={s.statNum}>{urls.length}</div>
                    </div>
                    <div style={s.stat}>
                        <div style={s.statLabel}>Total Clicks</div>
                        <div style={s.statNum}>{totalClicks}</div>
                    </div>
                    <div style={s.stat}>
                        <div style={s.statLabel}>Active</div>
                        <div style={s.statNum}>{activeCount}</div>
                    </div>
                    <div style={s.stat}>
                        <div style={s.statLabel}>Expired</div>
                        <div style={s.statNum}>{expiredCount}</div>
                    </div>
                </div>

                {/* Create */}
                <div style={s.secLabel}>New Short Link</div>
                <UrlForm onCreated={fetchUrls} />

                {/* List */}
                <div style={s.divider} />
                <div style={s.secLabel}>Your Links — {urls.length}</div>

                {loading ? (
                    <div style={s.empty}>Loading...</div>
                ) : urls.length === 0 ? (
                    <div style={s.empty}>No links yet. Create your first one above.</div>
                ) : (
                    urls.map(url => (
                        <UrlCard key={url._id} url={url} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: "100vh",
        background: "#09090f",
        width: "100%"
    },
    body: {
        maxWidth: "720px",
        margin: "0 auto",
        padding: "36px 20px 80px"
    },
    header: { marginBottom: "28px" },
    title: {
        fontSize: "20px",
        fontWeight: "700",
        letterSpacing: "-0.4px",
        color: "#e4e3ef",
        marginBottom: "2px"
    },
    sub: {
        fontSize: "13px",
        color: "#6b6880"
    },
    stats: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "8px",
        marginBottom: "28px"
    },
    stat: {
        background: "#0f0f17",
        border: "1px solid #1c1c28",
        borderRadius: "10px",
        padding: "16px"
    },
    statLabel: {
        fontSize: "11px",
        fontWeight: "500",
        color: "#35334a",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "8px"
    },
    statNum: {
        fontSize: "26px",
        fontWeight: "700",
        color: "#e4e3ef",
        letterSpacing: "-1px",
        lineHeight: "1"
    },
    secLabel: {
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.6px",
        textTransform: "uppercase",
        color: "#35334a",
        marginBottom: "10px"
    },
    divider: {
        height: "1px",
        background: "#1c1c28",
        margin: "24px 0 16px"
    },
    empty: {
        fontSize: "13px",
        color: "#35334a",
        textAlign: "center",
        marginTop: "48px"
    }
};

export default Dashboard;