import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import chalk from 'chalk';
import { route } from './routes';

const app = express();
app.use(cors())

app.use(express.json())
app.use(route)


const server = app.listen(process.env.PORT || 5000, () => {
  const address = server.address() as AddressInfo
  console.log(chalk.yellow(`Servidor rodando em http://localhost:${address.port}`))
})