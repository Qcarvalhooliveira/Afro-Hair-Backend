import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'
import { z } from 'zod'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {env} from '../env/index'
import {verifyJwt} from '../middleware/verify-jwt'

export async function usersRoutes (app: FastifyInstance){
  const secretKey = env.JWT_KEY
  const refreshTokenSecretKey = env.REFRESH_JWT_KEY


    app.get('/users', async ()=>{
      // get route for users its just for backend to see the users when in developping stage, in production i don't think it's safe to have it
        const userTables = await knex('users').select('*')

        
        return {userTables}
        })

       
    
    app.post('/users', async (req, res)=>{
        const createUserBodyschema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
        })
        
        const {name, email, password} = createUserBodyschema.parse(req.body)
       
        try {
            const password_hashed = await bcrypt.hash(password, 10);
        
            const createUser = await knex('users').insert({
              usersId: crypto.randomUUID(),
              name,
              email,
              password: password_hashed,
            });
          
        
            res.status(201).send({ "createUser": createUser });
          } catch (error) {
            console.error('Error when making password hash', error);
            res.status(500).send('Internal error making password hash');
          }
        });
        
    app.delete(`/users/:id`,{preValidation: [verifyJwt]}, async (req, res)=>{
      const createUserParamSchema = z.object({
        id: z.string(),
    })
    const { id } = createUserParamSchema.parse(req.params)
        const deleteUsers = await knex('users').where({usersId: id}).del()
        return res.status(202).send({deleteUsers})
    })
    

      app.post('/users/login', async (req, res) => {
      const loginBodySchema = z.object({
        email: z.string(),
        password: z.string(),
      });
    
      const { email, password } = loginBodySchema.parse(req.body);
    
      try {
        const user = await knex('users').where({ email }).first();
    
        if (!user) {
          // Usuário não encontrado
          return res.status(401).send('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          // Senha incorreta
          return res.status(401).send('Invalid credentials');
        }
    
        // Autenticação bem-sucedida

        const token = jwt.sign({ id: user.usersId }, secretKey, {
          expiresIn: '15m',
        })

        const refreshToken = jwt.sign({ id: user.usersId }, refreshTokenSecretKey, {
          expiresIn: '7d',
        })

        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 7)

        await knex('refresh_tokens').insert({
          token: refreshToken,
          userId: user.usersId,
          expires_at: expirationDate
        })

        res.status(200).send({authToken: token, refreshToken: refreshToken});
      } catch (error) {
        console.error('Erro ao fazer login', error);
        res.status(500).send('Erro interno no servidor');
      }
    });

    app.post('/users/refresh-token', async (req, res) => {
      const refreshTokenSchema = z.object({
        refreshToken: z.string(),
      })
      const {refreshToken} = refreshTokenSchema.parse(req.body)
      if (!refreshToken) {
        return res.status(400).send({ message: "Refresh token is needed." });
      }
      try {
        const decodedToken = jwt.verify(refreshToken, refreshTokenSecretKey);
        if (typeof decodedToken !== 'object' || !decodedToken.id) {
          return res.status(401).send({ message: "Refresh token invalid." });
        }
       
        const tokenData = await knex('refresh_tokens').where({ token: refreshToken }).andWhere('expires_at', '>', new Date()).first();

        if(!tokenData) {
          return res.status(401).send({ message: "Refresh token invalid or expired." });
        }

        const newToken = jwt.sign({ id: decodedToken.id }, secretKey, {
          expiresIn: '15m',
        })

        await knex('refresh_tokens').where('expires_at', '<', new Date()).del()

        res.status(200).send({ authToken: newToken });
    
    } catch (err) {
      console.error('Error validating refresh token', err);
    res.status(401).send({ message: "Error validating refresh token." })
    } 
   })
  }