import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agencija = new Schema({
    ime: {
        type: String
    },
    pib: {
        type: String
    },
    grad: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    }

})

export default mongoose.model('Agencija', Agencija, 'agencije');

