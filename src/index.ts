import 'reflect-metadata'
import express, { Request ,Response } from "express";
import { router } from "./routes";
import { AppDataSource } from './database';

const serve = express();

serve.use(express.json())
serve.use(router)

serve.get("/", (request: Request , response: Response) => {
    return response.status(200).json({ message: 'BancoCentral API' })
})
 

serve.listen(5000, () => console.log("Servidor on update"))