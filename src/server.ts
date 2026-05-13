import express, { type Request, type Response } from 'express'


const app = express()
const port = 5500

// middleware 

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('This is new server')
})

app.post('/', (req: Request, res: Response) =>{
    console.log("this is body",req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})