import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/user.routes.js"


const app = express();


app.use(cors({
    origin: '*',
    credentials:false,
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true ,limit: "16kb"}));


app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/users',userRouter)



app.post('/test', (req, res) => {
    console.log(req.body.email);
    res.send('Body received');
});

export default app