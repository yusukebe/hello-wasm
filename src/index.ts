import { Hono } from 'hono'
import module from './add.wasm'

const app = new Hono()

app.get('/', async (c) => {
  const { a, b } = c.req.query()
  const instance = await WebAssembly.instantiate(module)
  const add = instance.exports.add
  const result = add(a || 1, b || 3)
  return c.text(`Result: ${result}`)
})

export default app
