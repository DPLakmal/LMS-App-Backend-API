
import dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose, { Mongoose } from 'mongoose';
import morgan from 'morgan';

dotenv.config()


const app: Application = express();

//Middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

//Connect to mongoDB
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '',);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
})();

const routes = require('./routes/routes')
app.use('/api', routes)

const PORT: number = parseInt(process.env.PORT || '3000');
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));


