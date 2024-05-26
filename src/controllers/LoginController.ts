import { Request, Response } from "express"
import { UserService } from "../services/UserService"

const user = {
    id_name: '1234567',
    name: 'Everton Vaz Santana',
    email: 'Everton@gmail.com',
    password: 'password'
}

export class LoginController {
    userService: UserService

    constructor(
        userService = new UserService()
    ){
        this.userService = userService
    }
 
    login = async(request: Request, response: Response) => {
        const { email, password } = request.body
        
        //Se tudo de certo! 
        try{
            const token = await this.userService.getToken(email,password)

            return response.status(200).json({ token })

        // Caso de error 
        } catch(error){
            return response.status(500).json({ message: "Email/Password invalid!" })
        }
    }
}