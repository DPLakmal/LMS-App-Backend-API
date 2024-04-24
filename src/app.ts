
import express from 'express';


const app = express();
const PORT: any = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/login', (req, res) => {
    res.send('hello world i am in login ')
})

export default app;