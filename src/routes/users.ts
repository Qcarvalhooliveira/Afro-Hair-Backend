import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'
import { z } from 'zod'
import bcrypt from 'bcrypt';

export async function usersRoutes (app: FastifyInstance){

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
          
        
            res.send({ "createUser": createUser });
          } catch (error) {
            console.error('Error when making password hash', error);
            res.status(500).send('Internal error making password hash');
          }
        });
        
    app.delete(`/users/:id`, async (req, res)=>{
      const createUserParamschema = z.object({
        id: z.string(),
    })
    const { id } = createUserParamschema.parse(req.params)
        const deleteUsers = await knex('users').where({usersId: id}).del()
        return res.send({deleteUsers})
    })
    
    }

    