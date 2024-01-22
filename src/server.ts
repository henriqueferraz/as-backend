import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import https from 'https'
import http from 'http'
import fs from 'fs'

import siteRoutes from './router/site'
import adminRoutes from './router/admin'
import { requestIntersepter } from './utils/requestIntercepter'


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestIntersepter); //testado interseptador

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(` 🚀 Servidor Rodando na porta ${port}`);
    })
}

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY as string),
        cert: fs.readFileSync(process.env.SSL_CERT as string)
    }

    const sslServer = https.createServer(options, app)
    runServer(80, regularServer)
    runServer(443, sslServer)

} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}