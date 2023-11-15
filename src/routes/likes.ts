import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { verifyJwt } from '../middleware/verify-jwt'
import crypto from 'node:crypto'

export async function likesRoutes(app: FastifyInstance) {
  // all the routes are authenticated

  app.get(
    '/likes/:userId',
    { preValidation: [verifyJwt] },
    async (req, res) => {
      const getLikesParamSchema = z.object({
        userId: z.string(),
      })

      try {
        const { userId } = getLikesParamSchema.parse(req.params)
        const likesTables = await knex('likes')
          .where('userId', userId)
          .select('*')

        if (likesTables.length === 0) {
          return res
            .status(404)
            .send({ message: 'Likes not found for the given user ID.' })
        }
        return res.status(200).send({ likesTables })
      } catch (error) {
        console.error('Error fetching likes', error)
        return res
          .status(500)
          .send({ message: 'Internal server error while fetching likes.' })
      }
    },
  )

  app.post(
    '/likes/:userId',
    { preValidation: [verifyJwt] },
    async (req, res) => {
      const getLikesParamSchema = z.object({
        userId: z.string(),
      })
      const productLikedParamSchema = z.object({
        productLiked: z.string(),
      })

      try {
        const { userId } = getLikesParamSchema.parse(req.params)
        const { productLiked } = productLikedParamSchema.parse(req.body)

        const like = await knex('likes').insert({
          likesId: crypto.randomUUID(),
          productLiked,
          userId,
        })
        res.status(201).send({ 'like created:': like })
      } catch (error) {
        console.error('Error creating like', error)
        return res
          .status(500)
          .send({ message: 'Internal server error while creating like.' })
      }
    },
  )

  app.delete(
    '/likes/:userId',
    { preValidation: [verifyJwt] },
    async (req, res) => {
      const getLikesParamSchema = z.object({
        userId: z.string(),
      })
      const productLikedParamSchema = z.object({
        productLiked: z.string(),
      })
      try {
        const { userId } = getLikesParamSchema.parse(req.params)
        const { productLiked } = productLikedParamSchema.parse(req.body)

        const deletedRows = await knex('likes')
          .where({ userId, productLiked })
          .del()
        if (deletedRows === 0) {
          return res
            .status(404)
            .send({ message: 'Like not found or already deleted.' })
        }
        return res.status(202).send({ message: 'Like deleted successfully.' })
      } catch (error) {
        console.error('Error deleting like', error)
        return res
          .status(500)
          .send({ message: 'Internal server error while deleting like.' })
      }
    },
  )
}
