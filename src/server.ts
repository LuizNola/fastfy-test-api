import fastfy from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastfy()

app.register(transactionsRoutes, { prefix: 'transactions' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Funcionando! na porta 3333')
  })
