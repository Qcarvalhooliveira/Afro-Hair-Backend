import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users'
import fastifyCors from '@fastify/cors'



const app = fastify()
app.register(fastifyCors, {
    origin: "*",
})


app.register(usersRoutes)

app.listen({
    port: env.PORT,
}).then(() =>{
    console.log('http server running!')
})