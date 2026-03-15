require("dotenv").config({ path: "./backend/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const urlRoutes = require("./routes/urlRoutes");
const authRoutes = require("./routes/authRoutes");
const { redirectUrl } = require("./controllers/urlController");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("db connected"); })
    .catch((err) => { console.log(err) });

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.get("/:shortId", redirectUrl);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, '0.0.0.0', () => {
    console.log("server connected on port", process.env.PORT || 8000);
});
