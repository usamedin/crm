import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import { VERSION } from './src/utils/constants';
import addEndpoints from './src/handlers'

const app = express();
app.use(express.json());

app.get('/about', (_req, res) => res.send({ serviceName: 'CRM service', version: VERSION }));

addEndpoints(app)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
