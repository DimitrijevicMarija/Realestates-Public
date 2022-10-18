import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    grad: {
        type: String
    },
    datumRodjenja: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    agencija: {
        type: String
    },
    licenca: {
        type: String
    },
    tip: {
        type: String
    },
    profilna: {
        type: String
    },
    odobren: {
        type: String
    },
    omiljene : {
        type: Array
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');

