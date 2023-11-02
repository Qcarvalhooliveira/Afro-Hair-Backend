import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(usersRoutes)

app.listen({
    port: env.PORT,
}).then(() =>{
    console.log('http server running!')
})