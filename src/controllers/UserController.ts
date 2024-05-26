import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

export class UserController {
    userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: "Bad request: Todos os campos são obrigatorio" })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: "usuario criado" })
    }
    getUser = async(request: Request, response: Response) => {
        const { userId } = request.params
        const user = await this.userService.getUser( userId )
        return response.status(200).json({
            userId: user?.user_id,
            name: user?.name,
            email: user?.email
        })
    } 
    deleteUser = (request: Request, response: Response) => {
        const user = request.body
        console.log("Deletando usuario...", user)
        return response.status(200).json({ message: "Usuario Deletado" })
    }
}
