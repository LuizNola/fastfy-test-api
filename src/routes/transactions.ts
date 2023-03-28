import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

import crypto from 'node:crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(req.body)

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return res.status(201).send()
  })

  app.get('/', async () => {
    const transactions = knex('transactions').select('*')

    return transactions
  })

  app.get('/total', async () => {
    const transactions = knex('transactions').sum('amount')

    return transactions
  })
}
