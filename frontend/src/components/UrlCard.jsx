import API from "../api/axios";

function UrlCard({ url, onDelete }) {
    const shortUrl = `http://localhost:8001/${url.shortId}`;
    const isExpired = url.expiresAt && new Date() > new Date(url.expiresAt);

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/api/url/${url._id}`);
            onDelete(url._id);
        } catch (err) {
            alert("Failed to delete");
        }
    };

    return (
        <div style={{ ...s.card, opacity: isExpired ? 0.38 : 1 }}>
            <div style={s.top}>
                <div style={s.left}>
                    <div style={s.short}>{shortUrl}</div>
                    <div style={s.orig}>{url.originalUrl}</div>
                </div>
                <div style={s.actions}>
                    <button onClick={handleCopy} style={s.copyBtn}>Copy</button>
                    <button onClick={handleDelete} style={s.delBtn}>Delete</button>
                </div>
            </div>

            <div style={s.meta}>
                <span style={s.chip}>{url.clicks} clicks</span>
                <span style={s.chip}>
                    {url.expiresAt
                        ? `${isExpired ? "Expired" : "Expires"} ${new Date(url.expiresAt).toLocaleDateString()}`
                        : "No expiry"
                    }
                </span>
                <span style={isExpired ? s.badgeOff : s.badgeOn}>
                    <span style={isExpired ? s.dotRed : s.dotGreen} />
                    {isExpired ? "Expired" : "Active"}
                </span>
            </div>
        </div>
    );
}

const s = {
    card: {
        background: "#0f0f17",
        border: "1px solid #1c1c28",
        borderRadius: "10px",
        padding: "14px 16px",
        marginBottom: "6px"
    },
    top: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "12px",
        marginBottom: "8px"
    },
    left: { overflow: "hidden" },
    short: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#e4e3ef",
        letterSpacing: "-0.1px"
    },
    orig: {
        fontSize: "12px",
        color: "#35334a",
        marginTop: "2px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "380px"
    },
    actions: { display: "flex", gap: "5px", flexShrink: 0 },
    copyBtn: {
        padding: "5px 12px",
        background: "#6366f114",
        border: "1px solid #6366f128",
        color: "#6366f1",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: "600"
    },
    delBtn: {
        padding: "5px 12px",
        background: "transparent",
        border: "1px solid #252535",
        color: "#6b6880",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: "500"
    },
    meta: { display: "flex", alignItems: "center", gap: "14px" },
    chip: { fontSize: "11px", color: "#35334a" },
    badgeOn: {
        display: "inline-flex", alignItems: "center", gap: "4px",
        fontSize: "10px", fontWeight: "600", letterSpacing: "0.4px",
        textTransform: "uppercase", padding: "2px 7px",
        borderRadius: "4px", background: "#4ade8010",
        color: "#4ade80", border: "1px solid #4ade8020"
    },
    badgeOff: {
        display: "inline-flex", alignItems: "center", gap: "4px",
        fontSize: "10px", fontWeight: "600", letterSpacing: "0.4px",
        textTransform: "uppercase", padding: "2px 7px",
        borderRadius: "4px", background: "#f8717110",
        color: "#f87171", border: "1px solid #f8717120"
    },
    dotGreen: {
        width: "4px", height: "4px",
        borderRadius: "50%", background: "#4ade80",
        display: "inline-block"
    },
    dotRed: {
        width: "4px", height: "4px",
        borderRadius: "50%", background: "#f87171",
        display: "inline-block"
    }
};

export default UrlCard;