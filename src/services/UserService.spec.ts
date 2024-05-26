import {  UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock("../database", () => {
    initialize: jest.fn()
})

jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () =>{
    const userService = new UserService(mockUserRepository)

    const mockUser = {
        user_id: "1234567",
        name: "evinhoo",
        email: "Everton@gmail.com",
        password: "1234567"
    }

    it("Deve adicionar um novo usuario", async() => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('Evinhoo', 'Everton@gmail.com', '1234567');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({ 
            user_id: "1234567",
            name: "evinhoo",
            email: "Everton@gmail.com",
            password: "1234567"
         })
    })
    
    it("Deve retorna um token de usuario", async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('everton@gmail.com', '1234567')
        expect(token).toBe("token")
    })

    it("Deve retorna um erro, caso não encontre um usuario", async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@gmail.com', '1234567')).rejects.toThrow(new Error("Email/Password invalid!"))
    })
})