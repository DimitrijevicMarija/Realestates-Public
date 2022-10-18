import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Nekretnina = new Schema({

    naziv : {
        type: String
    },
    tip : {
        type: String
    },
    opis : {
        type: String
    },
    grad : {
        type: String
    },
    opstina : {
        type: String
    },
    mikrolokacija : {
        type: String
    },
    ulica : {
        type: String
    },
    kvadratura : {
        type: Number
    },
    brojSoba : {
        type: Number
    }, // 5+ je 6
    godinaIzgradnje : {
        type: Number
    },
    stanje : {
        type: String
    },
    grejanje : {
        type: String
    },
    sprat :  {
        type: Number
    },
    ukupnaSpratnost :  {
        type: Number
    }, 
    oglasivac : {
        type: String
    },
    agencija : {
        type: String
    },
    cena :  {
        type: Number
    },
    rezije :  {
        type: Number
    },
    
    slike : { // to ce biti Array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type : Array
    },
    linije : {
        type: String
    }, // samo string 25, 25P
    prodato :  {
        type: Number
    }, //1-12 kao mesec
    poslednjaIzmena : {
        type: String
    },
    //dodaj karakteristike 
    parking :  {
        type: Boolean
    },  //0-1
    terasa :  {
        type: Boolean
    },
    lodja :  {
        type: Boolean
    },
    francBalkon :  {
        type: Boolean
    },
    lift :  {
        type: Boolean
    },
    podrum :  {
        type: Boolean
    },
    garaza :  {
        type: Boolean
    },
    basta :  {
        type: Boolean
    },
    klima :  {
        type: Boolean
    },
    internet :  {
        type: Boolean
    },
    interfon :  {
        type: Boolean
    },
    telefon :  {
        type: Boolean
    }

})

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnine');

