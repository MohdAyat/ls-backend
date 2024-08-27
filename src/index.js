// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/users.js";
import externalLinkRouter from "./routes/externalLinks.js";
dotenv.config({ path: "./.env" });

const app = express();
//CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://www.luxswipe.in", "https://luxswipe-front-woad.vercel.app"];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

//Routes
app.use("/users", router);
app.use("/links",externalLinkRouter);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});
const port = process.env.PORT;
// console.log(port)
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
