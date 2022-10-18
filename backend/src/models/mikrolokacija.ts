import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Mikrolokacija = new Schema({
    naziv: {
        type: String
    },
    opstina: {
        type: String
    },
    grad: {
        type: String
    },
    ulice: {
        type: Array
    }

})

export default mongoose.model('Mikrolokacija', Mikrolokacija, 'mikrolokacije');

