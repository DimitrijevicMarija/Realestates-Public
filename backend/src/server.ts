import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import korisnikRouter from './routers/korisnik.router'
import nekretninaRouter from './routers/nekretnina.router'

const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/nekretnine')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connection ok')
})
const ruter = express.Router()
ruter.use('/korisnici', korisnikRouter)
ruter.use('/nekretnine', nekretninaRouter)
app.use('/', ruter);

app.listen(4000, () => console.log(`Express server running on port 4000`))