// Imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import dotenv from "dotenv";
import path from "path";

// Import routers
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import moviesRoute from "./routes/movies.js";

// Configs
dotenv.config();

const corsOptions = {
    origin: [process.env.CORS_ORIGIN1, process.env.CORS_ORIGIN2],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

// Initiallisation de l'app
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port d'écoute
app.listen(process.env.APP_BACK_PORT, () => console.log(`Connected to Backend on port ${process.env.APP_BACK_PORT}`));

// Redirection de public sur uploads
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/movies", moviesRoute);

// Gestion de l'erreur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`${err.message}`)
})
