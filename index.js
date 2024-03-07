import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoute.js';


const app = express();



dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));



const port = process.env.PORT;

app.use('/', userRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
