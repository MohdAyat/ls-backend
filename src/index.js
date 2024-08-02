// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import router from "./routes/users.js";
dotenv.config({path: "./.env"})


const app = express();
app.use(express.json());

//Routes
app.use("/users", router);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`);
})

export default app;