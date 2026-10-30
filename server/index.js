const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouters = require('./routes/authRoutes')
const connectDB = require('./config/database');
const transactionRoutes = require('./routes/transactionRoutes')
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config()
connectDB();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());


//Routers

app.use('/api/auth',authRouters)
app.use('/api/transaction',transactionRoutes)
app.use("/api/notifications", notificationRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{

    console.log(`server is runug on this ${PORT}`)
})


