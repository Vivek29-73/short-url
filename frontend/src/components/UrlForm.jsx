import { useState } from "react";
import API from "../api/axios";

function UrlForm({ onCreated }) {
    const [originalUrl, setOriginalUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [expiresInDays, setExpiresInDays] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setShortUrl("");
        try {
            const res = await API.post("/api/url/create", {
                originalUrl,
                customAlias: customAlias || undefined,
                expiresInDays: expiresInDays ? Number(expiresInDays) : undefined
            });
            setShortUrl(res.data.shortUrl);
            setOriginalUrl("");
            setCustomAlias("");
            setExpiresInDays("");
            onCreated();
        } catch (err) {
            const data = err.response?.data;
            if (data?.errors && data.errors.length > 0) {
                setError(data.errors[0].msg);
            } else {
                setError(data?.message || "Something went wrong");
            }
        }
    };

    return (
        <div style={s.card}>
            <form onSubmit={handleSubmit}>
                <input
                    style={s.input}
                    placeholder="Destination URL — https://your-long-url.com"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <div style={s.row}>
                    <input
                        style={s.input}
                        placeholder="Custom alias (optional)"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                    />
                    <input
                        style={{ ...s.input, maxWidth: "170px" }}
                        type="number"
                        placeholder="Expiry in days"
                        value={expiresInDays}
                        onChange={(e) => setExpiresInDays(e.target.value)}
                    />
                </div>
                <button type="submit" style={s.btn}>
                    Generate Short Link
                </button>
            </form>

            {shortUrl && (
                <div style={s.result}>
                    <span style={s.resultUrl}>{shortUrl}</span>
                    <button
                        style={s.copyBtn}
                        onClick={() => navigator.clipboard.writeText(shortUrl)}
                    >
                        Copy
                    </button>
                </div>
            )}
            {error && <div style={s.error}>{error}</div>}
        </div>
    );
}

const s = {
    card: {
        background: "#0f0f17",
        border: "1px solid #1c1c28",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "28px"
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
        boxSizing: "border-box",
        marginBottom: "8px"
    },
    row: {
        display: "flex",
        gap: "8px"
    },
    btn: {
        width: "100%",
        padding: "10px",
        background: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "2px"
    },
    result: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "12px",
        padding: "10px 13px",
        background: "#14141e",
        border: "1px solid #252535",
        borderRadius: "8px"
    },
    resultUrl: {
        fontSize: "13px",
        color: "#e4e3ef",
        fontWeight: "500"
    },
    copyBtn: {
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        color: "#6366f1",
        padding: "4px 10px",
        border: "1px solid #6366f128",
        borderRadius: "5px",
        background: "#6366f114",
        cursor: "pointer"
    },
    error: {
        marginTop: "12px",
        padding: "10px 12px",
        background: "#f8717110",
        border: "1px solid #f8717120",
        borderRadius: "7px",
        color: "#f87171",
        fontSize: "13px"
    }
};

export default UrlForm;