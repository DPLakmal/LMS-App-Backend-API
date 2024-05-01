import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/routes';

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongodb_uri = process.env.MONGODB_URI as string;

mongoose
  .connect(mongodb_uri)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});