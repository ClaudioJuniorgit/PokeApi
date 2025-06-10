import * as dotenv from 'dotenv';
dotenv.config();
import YAML from 'yamljs';
import express from 'express';
import userRoutes from './routes.js';
import { AppDataSource } from './database/data-source.js';
import expressBasicAuth from 'express-basic-auth';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT;
const swaggerDocs = YAML.load('./src/docs/swagger.yaml');

AppDataSource.initialize().then(() => {
  console.log('Banco de dados conectado');
});

app.use(
  ['/docs', '/docs-json'],
  expressBasicAuth({
    challenge: true,
    users: { dev: process.env.USER_PASSWORD_DOCS },
  })
);
app.use(express.json());
app.use('/api', userRoutes);
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      charset: 'utf-8',
      url: '/docs',
    },
  })
);
app.get('/docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
