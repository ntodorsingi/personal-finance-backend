import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import accountsRoutes from './routes/accounts';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', accountsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
