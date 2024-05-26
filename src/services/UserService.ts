import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }

    createUser = (name: string, email: string, password: string) => {
        const user = new User(name, email, password)
        return this.userRepository.createUser(user)
    }
    getUser = async(userId: string): Promise<User | null> => {
        return this.userRepository.getUser(userId)
    }
    getAuthenticatedUser = async(email: string, password: string) => {
        return this.userRepository.getUserByEmailAndPassword(email, password)        
    }
    getToken = async (email: string, password: string): Promise<string> =>{
        const user = await this.getAuthenticatedUser(email, password)

        if(!user){
            throw new Error("Email/Password invalid!")
        }

        const tokenData ={
            name: user?.name,
            email: user?.email
        } 

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.user_id
        }
        const token = sign(tokenData, tokenKey, tokenOptions)
        
        return token
    }
}   
