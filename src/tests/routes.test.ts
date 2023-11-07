import {describe, beforeAll, afterAll, test, expect, beforeEach } from 'vitest'
import { app } from '../app'
import request from 'supertest'
import { execSync } from 'node:child_process'


describe('route tests', () => {
    beforeAll(async () => {
       await app.ready()
    })
    afterAll(async () => {
       await app.close()
    })
    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
      })
    describe('users tests', () => {
        test('if can create a user', async () => {
            await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            }).expect(201)
            
        })

        test ('if its a diferent email', async () => {
            await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            }).expect(201)

            const createUserResponse = await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            }).expect(409)
            expect(createUserResponse.body).toEqual({ message: "Email already in use." })
            
        })

        test('if can list all users', async () => {
            const createUserResponse = await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const listUsers = await request(app.server).get('/users').send().expect(200)
            expect(listUsers.body.userTables).toEqual([expect.objectContaining({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
            })])
        })
        test('if can login a user',async () => {
            await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const response = await request(app.server).post('/users/login').send({
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            expect(response.body.authToken).toEqual(expect.any(String))
            expect(response.body.userId).toEqual(expect.any(String))
        })
        test('if can delete a user', async () => {
            const createUserResponse = await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const getUser =await request(app.server).get('/users').send()
            const userId = getUser.body.userTables[0].usersId
            const login = await request(app.server).post('/users/login').send({
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const token = login.body.authToken
    
            await request(app.server).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`).send().expect(202)
            
        })
        test('if can get a refresh token', async () => {
            const createUserResponse = await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const getUser =await request(app.server).get('/users').send()
            const userId = getUser.body.userTables[0].usersId
            const login = await request(app.server).post('/users/login').send({
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const refreshToken = login.body.refreshToken
            const refreshResponse = await request(app.server).post('/users/refresh-token').send({
                refreshToken
            }).expect(200)
            expect(refreshResponse.body.authToken).toEqual(expect.any(String))
    
        })
    })
    describe('like test', () => {
        test('if can create a like', async () => {
            const createUserResponse = await request(app.server).post('/users').send({
                name: 'John Doe',
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const getUser =await request(app.server).get('/users').send()
            const userId = getUser.body.userTables[0].usersId
            const login = await request(app.server).post('/users/login').send({
                email: 'johndoe@johndoe.com',
                password: '123456'
            })
            const token = login.body.authToken
          const createLike =  await request(app.server).post(`/likes/${userId}`).set('Authorization', `Bearer ${token}`).send({   
	            productLiked: "32"
            }).expect(201)
            expect(createLike.body).toEqual(
                expect.objectContaining({
                    "like created:": [
                        1
                    ]
                })
            )
        })
    })
    test ('if can delete likes', async () => {
        const createUserResponse = await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@johndoe.com',
            password: '123456'
        })
        const getUser =await request(app.server).get('/users').send()
        const userId = getUser.body.userTables[0].usersId
        const login = await request(app.server).post('/users/login').send({
            email: 'johndoe@johndoe.com',
            password: '123456'
        })
        const token = login.body.authToken
        const createLike =  await request(app.server).post(`/likes/${userId}`).set('Authorization', `Bearer ${token}`).send({   
            productLiked: "32"
        })
        const deleteLike = await request(app.server).delete(`/likes/${userId}`).set('Authorization', `Bearer ${token}`).send(
            { productLiked: "32"
            
        }).expect(202)
        expect(deleteLike.body).toEqual({ message: "Like deleted successfully." })
           
        
        
    })
    test('if can list likes', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@johndoe.com',
            password: '123456'
        })
        const getUser =await request(app.server).get('/users').send()
        const userId = getUser.body.userTables[0].usersId
        const login = await request(app.server).post('/users/login').send({
            email: 'johndoe@johndoe.com',
            password: '123456'
        })
        const token = login.body.authToken
         await request(app.server).post(`/likes/${userId}`).set('Authorization', `Bearer ${token}`).send({   
            productLiked: "32"
        })
        const listLikes = await request(app.server).get(`/likes/${userId}`).set('Authorization', `Bearer ${token}`).send().expect(200)
        expect(listLikes.body.likesTables).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    productLiked: "32"
                })
            ])
        );
        
    })
})