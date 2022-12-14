const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

// path for config 
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 80;


// import db    
const connectDB = require("./server/database/connections");
// connecting to database 
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));


// import routes
const userRoutes = require('./server/routes/userRoutes');
const taskRoutes = require('./server/routes/taskRoutes');
app.use('/api/v1', userRoutes);
app.use('/api/v1', taskRoutes);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})