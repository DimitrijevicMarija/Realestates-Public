"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    naziv: {
        type: String
    },
    tip: {
        type: String
    },
    opis: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    mikrolokacija: {
        type: String
    },
    ulica: {
        type: String
    },
    kvadratura: {
        type: Number
    },
    brojSoba: {
        type: Number
    },
    godinaIzgradnje: {
        type: Number
    },
    stanje: {
        type: String
    },
    grejanje: {
        type: String
    },
    sprat: {
        type: Number
    },
    ukupnaSpratnost: {
        type: Number
    },
    oglasivac: {
        type: String
    },
    agencija: {
        type: String
    },
    cena: {
        type: Number
    },
    rezije: {
        type: Number
    },
    slike: {
        type: Array
    },
    linije: {
        type: String
    },
    prodato: {
        type: Number
    },
    poslednjaIzmena: {
        type: String
    },
    //dodaj karakteristike 
    parking: {
        type: Boolean
    },
    terasa: {
        type: Boolean
    },
    lodja: {
        type: Boolean
    },
    francBalkon: {
        type: Boolean
    },
    lift: {
        type: Boolean
    },
    podrum: {
        type: Boolean
    },
    garaza: {
        type: Boolean
    },
    basta: {
        type: Boolean
    },
    klima: {
        type: Boolean
    },
    internet: {
        type: Boolean
    },
    interfon: {
        type: Boolean
    },
    telefon: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map