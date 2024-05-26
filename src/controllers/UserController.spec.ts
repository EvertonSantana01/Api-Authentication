import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"


const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserService', () =>{
    return{
        UserService: jest.fn().mockImplementation(() =>{
            return mockUserService
        })
    }
})

describe('UserController', () => {
    
    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                name: "Neura",
                email: "Neura@gmail.com",
                password: 'password'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: "usuario criado" })
    })

    it('Deve retorna erro caso o usuario nao informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'ana@test.com',
                password: 'password'
            }
        } as Request
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatorio' })
    })

    it("Deve informa um erro caso o usuario não informe o email", () => {
        const mockRequest = {
            body: {
                name: "ana",
                email: '',
                password: 'password'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatorio'  })
    })

    it("Deve informa um erro caso o usuario não informe o password", () => {
        const mockRequest = {
            body: {
                name: "ana",
                email: 'ana@test.com',
                password: ''
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatorio'  })
    })

    it('Deve retorna a mensagem de usuario deletado', () => {
        const mockRequest = {
            body: {
                name: "Ana",
                email: '',
                password: 'password'
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuario Deletado' })
    })

    it("Deve retorna o usuario com o userId informado", () => {
        const mockRequest = makeMockRequest({
            params:{
                userId: '1234567'
            }
        })
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('1234567')
        expect(mockResponse.state.status).toBe(200)
    })

})
