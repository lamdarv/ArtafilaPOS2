import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ProfileRoute from "./routes/ProfileRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import ShopRoute from "./routes/ShopRoute.js";

dotenv.config();

//Connect with MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"));
// app.use(express.static("uploads"));
app.use('/public', express.static('public'));

//routes
app.use('/api/profile/',ProfileRoute);
app.use('/api/product/',ProductRoute);
app.use('/api/transaction/',TransactionRoute);
app.use('/api/member/',MemberRoute);
app.use('/api/shop/',ShopRoute);
//create port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Serve at running on the port: http://localhost:${PORT}`);
} )