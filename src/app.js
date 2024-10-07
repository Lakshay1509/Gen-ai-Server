import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors(
    {
        origin: "*",
        credentials: true
    }
));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

export default app