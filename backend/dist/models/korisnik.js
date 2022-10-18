"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    omiljene: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnici');
//# sourceMappingURL=korisnik.js.map