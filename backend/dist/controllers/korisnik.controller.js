"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const agencija_1 = __importDefault(require("../models/agencija"));
class KorisnikController {
    constructor() {
        this.uloguj = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else {
                    if (korisnik == null) {
                        res.status(200).json({ "poruka": "Pogresni kredencijali" });
                    }
                    else {
                        korisnik_1.default.findOne({ 'korisnickoIme': korisnickoIme, 'lozinka': lozinka }, (err, korisnik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (korisnik == null) {
                                    res.status(200).json({ "poruka": "Pogresni kredencijali" });
                                }
                                else {
                                    res.status(200).json({ "poruka": "",
                                        "korisnik": korisnik });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.registruj = (req, res) => {
            let korisnickoImeGreska = "";
            let imejlGreska = "";
            korisnik_1.default.findOne({ 'korisnickoIme': req.body.korisnickoIme }, (err, korisnik) => {
                if (err)
                    console.log(err);
                if (korisnik != null)
                    korisnickoImeGreska = "Korisnicko ime nije jedinstveno";
                korisnik_1.default.findOne({ 'imejl': req.body.imejl }, (err, korisnik2) => {
                    if (err)
                        console.log(err);
                    if (korisnik2 != null)
                        imejlGreska = "I-mejl adresa nije jedinstvena";
                    if (korisnickoImeGreska == "" && imejlGreska == "") {
                        let korisnikNovi = new korisnik_1.default(req.body);
                        korisnikNovi.save().then(k => {
                            res.status(200).json({ "korisnickoImeGreska": "",
                                "imejlGreska": "",
                                "poruka": "Korisnik je uspesno dodat" });
                        }).catch(err => {
                            res.status(400).json({ "korisnickoImeGreska": "",
                                "imejlGreska": "",
                                "poruka": "Dogodila se greska" });
                        });
                    }
                    else {
                        res.status(200).json({ "korisnickoImeGreska": korisnickoImeGreska,
                            "imejlGreska": imejlGreska });
                    }
                });
            });
        };
        this.promeniLozinku = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'lozinka': lozinka } }, (err, korisnik) => {
                if (err) {
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else
                    res.status(200).json({ "poruka": "Uspesno promenjena lozinka" });
            });
        };
        this.dohvatiKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, korisnici) => {
                res.json(korisnici);
            });
        };
        this.potvrdiOdbijKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let odobren = req.body.odobren;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'odobren': odobren } }, (err, korisnik) => {
                if (err) {
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else
                    res.status(200).json({ "poruka": "Uspesno promenjena status korisnika" });
            });
        };
        this.dohvatiProfilnu = (req, res) => {
            let profilna = req.body.profilna;
            var path = require('path');
            let lastindex = __dirname.lastIndexOf(path.sep);
            lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
            let parentFolder = __dirname.substr(0, lastindex);
            //console.log(parentFolder)
            res.sendFile(`${parentFolder}${path.sep}uploads${path.sep}${profilna}`);
        };
        this.obrisiKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            korisnik_1.default.findOneAndDelete({ 'korisnickoIme': korisnickoIme }, (err, korisnik) => {
                if (err) {
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else
                    res.status(200).json({ "poruka": "Uspesno obrisan korisnik" });
            });
        };
        this.dodajAgenciju = (req, res) => {
            let agencija = new agencija_1.default(req.body);
            agencija.save().then(a => {
                res.status(200).json({ "poruka": "Agencija je uspesno dodata" });
            }).catch(err => {
                res.status(200).json({ "poruka": "Dogodila se greska" });
            });
        };
        this.dohvatiAgencije = (req, res) => {
            agencija_1.default.find({}, (err, a) => {
                res.json(a);
            });
        };
        this.izmeni = (req, res) => {
            korisnik_1.default.findOneAndUpdate({ 'korisnickoIme': req.body.korisnickoIme }, { $set: { ime: req.body.ime, prezime: req.body.prezime, grad: req.body.grad,
                    telefon: req.body.telefon, datumRodjenja: req.body.datumRodjenja,
                    agencija: req.body.agencija, licenca: req.body.licenca, tip: req.body.tip } }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else {
                    res.status(200).json({ "poruka": "Korisnik je uspesno izmenjen" });
                }
            });
        };
        this.izmeniProfilnu = (req, res) => {
            korisnik_1.default.findOneAndUpdate({ 'korisnickoIme': req.body.korisnickoIme }, { $set: { profilna: req.body.profilna } }, (err, korisnik) => {
                if (err) {
                    console.log(err);
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else {
                    res.status(200).json({ "poruka": "Korisniku je uspesno izmenjena profilna" });
                }
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ korisnickoIme: kor_ime }, (err, k) => {
                res.json(k);
            });
        };
        this.dohvatiAgenciju = (req, res) => {
            let pib = req.body.pib;
            agencija_1.default.findOne({ pib: pib }, (err, a) => {
                res.json(a);
            });
        };
        this.dodajUOmiljene = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let idN = req.body.idN;
            korisnik_1.default.updateOne({ korisnickoIme: korisnickoIme }, { $push: { omiljene: idN } }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json("OKEJ");
            });
        };
        this.ukloniIzOmiljenih = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let idN = req.body.idN;
            korisnik_1.default.updateOne({ korisnickoIme: korisnickoIme }, { $pull: { omiljene: idN } }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json("OKEJ");
            });
        };
        this.promeniPodatkeZaProdavca = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            let tip = req.body.tip;
            let telefon = req.body.telefon;
            let agencija = req.body.agencija;
            let imejl = req.body.imejl;
            let licenca = req.body.licenca;
            korisnik_1.default.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'tip': tip, 'telefon': telefon, 'agencija': agencija, 'imejl': imejl, 'licenca': licenca } }, (err, korisnik) => {
                if (err) {
                    res.status(200).json({ "poruka": "Dogodila se greska" });
                }
                else
                    res.status(200).json({ "poruka": "Uspesno promenjeni podaci" });
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map