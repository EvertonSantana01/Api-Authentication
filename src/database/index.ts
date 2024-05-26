import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    "synchronize": false,
    entities: [
        User
    ], 
    migrations: [
        "./src/database/migrations/*.ts"
    ],
})
 
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source Inicializado!")
    })
    .catch((error) => {
        console.error(error)
    })