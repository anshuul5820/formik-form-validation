import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { User } from './models/user-model'
import bcrypt from 'bcrypt'
import { MONGO_PASSWORD, MONGO_USERNAME } from '../creds.config'

const app = express()

app.use(express.json())
app.use(cors())

app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body

    if (!(reqBody.email && reqBody.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    const user = new User(reqBody)
    console.log('23: ', user.password)
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    res.status(201).send({ data: reqBody })
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hello').status(200)
})

console.log('33:', MONGO_USERNAME, MONGO_PASSWORD)


app.listen(4000, () => {
    mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.u4r4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(() => console.log('connected to mongo'))
        .catch(err => console.log('something went wrong', err))
    console.log('Server runnning on port 4000')
})


