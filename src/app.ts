import fastify from 'fastify'
import { env } from './env'
import { likesRoutes } from './routes/likes'
import { usersRoutes } from './routes/users'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()
app.register(fastifyCors, {
  origin: '*',
})
app.register(fastifyJwt, {
  secret: env.JWT_KEY,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)
app.register(likesRoutes)
