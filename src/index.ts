import express from 'express';
import cors from 'cors';
import accountsRouter from './routes/accounts'; // Uvezi ruter za naloge

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta za testiranje
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Koristi ruter za naloge (accountsRouter)
app.use('/api', accountsRouter);

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
