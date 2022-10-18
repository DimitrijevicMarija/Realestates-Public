"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const tip_1 = __importDefault(require("../models/tip"));
const grad_1 = __importDefault(require("../models/grad"));
const opstina_1 = __importDefault(require("../models/opstina"));
const mikrolokacija_1 = __importDefault(require("../models/mikrolokacija"));
const linija_1 = __importDefault(require("../models/linija"));
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
class NekretninaController {
    constructor() {
        this.dohvatiTipove = (req, res) => {
            tip_1.default.find({}, (err, tipovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(tipovi);
            });
        };
        this.dohvatiGradove = (req, res) => {
            grad_1.default.find({}, (err, g) => {
                if (err)
                    console.log(err);
                else
                    res.json(g);
            });
        };
        this.dohvatiOpstine = (req, res) => {
            opstina_1.default.find({}, (err, o) => {
                if (err)
                    console.log(err);
                else
                    res.json(o);
            });
        };
        this.dohvatiMikrolokacije = (req, res) => {
            mikrolokacija_1.default.find({}, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.json(m);
            });
        };
        this.dohvatiLinije = (req, res) => {
            linija_1.default.find({}, (err, l) => {
                if (err)
                    console.log(err);
                else
                    res.json(l);
            });
        };
        this.dodajNekretninu = (req, res) => {
            console.log(req.body.slike);
            let n = new nekretnina_1.default(req.body);
            n.save().then((v) => {
                res.json({ "poruka": "Uspesno sacuvano" });
            });
        };
        this.dohvatiNekretnine = (req, res) => {
            let limit = req.body.limit;
            let skip = req.body.skip;
            nekretnina_1.default.find({ prodato: 0 }).sort({ _id: -1 }).skip(skip).limit(limit).exec((err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvatiNekretninu = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.findOne({ _id: id }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.jednostavnaPretaraga = (req, res) => {
            let tip = req.body.tip;
            let cena = req.body.cena;
            let grad = req.body.grad;
            let opstina = req.body.opstina;
            let mikrolokacija = req.body.mikrolokacija;
            let kvadratura = req.body.kvadratura;
            let brojSoba = req.body.brojSoba;
            let limit = req.body.limit;
            let skip = req.body.skip;
            nekretnina_1.default.find({ prodato: 0, tip: tip, cena: { $lte: cena }, kvadratura: { $gte: kvadratura }, brojSoba: { $gte: brojSoba }, grad: { $regex: grad }, opstina: { $regex: opstina }, mikrolokacija: { $regex: mikrolokacija } }).skip(skip).limit(limit).exec((err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.jednostavnaPretragaPrebroj = (req, res) => {
            let tip = req.body.tip;
            let cena = req.body.cena;
            let grad = req.body.grad;
            let opstina = req.body.opstina;
            let mikrolokacija = req.body.mikrolokacija;
            let kvadratura = req.body.kvadratura;
            let brojSoba = req.body.brojSoba;
            console.log(req.body);
            nekretnina_1.default.find({ prodato: 0, tip: tip, cena: { $lte: cena }, kvadratura: { $gte: kvadratura }, brojSoba: { $gte: brojSoba }, grad: { $regex: grad }, opstina: { $regex: opstina }, mikrolokacija: { $regex: mikrolokacija } }).count().exec((err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.prosecnaCena = (req, res) => {
            let tip = req.body.tip;
            let mikrolokacija = req.body.mikrolokacija;
            nekretnina_1.default.aggregate([
                { $match: { 'tip': tip, 'mikrolokacija': mikrolokacija } },
                { $project: { name: 1, cenaKvadrata: { $divide: ["$cena", "$kvadratura"] } } },
                {
                    $group: {
                        _id: null,
                        average: { $avg: '$cenaKvadrata' }
                    }
                }
            ], (err, n) => {
                res.json(n);
            });
        };
        this.slozenaPretraga = (req, res) => {
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            let kvadraturaOd = req.body.kvadraturaOd;
            let kvadraturaDo = req.body.kvadraturaDo;
            let brojSobaOd = req.body.brojSobaOd;
            let brojSobaDo = req.body.brojSobaDo;
            let godinaIzgradnjeOd = req.body.godinaIzgradnjeOd;
            let godinaIzgradnjeDo = req.body.godinaIzgradnjeDo;
            let spratOd = req.body.spratOd;
            let spratDo = req.body.spratDo;
            let mesecneRezijeOd = req.body.mesecneRezijeOd;
            let mesecneRezijeDo = req.body.mesecneRezijeDo;
            let stanje = req.body.stanje;
            let grejanje = req.body.grejanje;
            let agencija = req.body.agencija;
            let limit = req.body.limit;
            let skip = req.body.skip;
            nekretnina_1.default.find({ prodato: 0,
                cena: { $gte: cenaOd, $lte: cenaDo },
                kvadratura: { $gte: kvadraturaOd, $lte: kvadraturaDo },
                brojSoba: { $gte: brojSobaOd, $lte: brojSobaDo },
                godinaIzgradnje: { $gte: godinaIzgradnjeOd, $lte: godinaIzgradnjeDo },
                sprat: { $gte: spratOd, $lte: spratDo },
                rezije: { $gte: mesecneRezijeOd, $lte: mesecneRezijeDo },
                stanje: { $in: stanje },
                grejanje: { $in: grejanje },
                agencija: { $regex: agencija }
            }).skip(skip).limit(limit).exec((err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.slozenaPretragaPrebroj = (req, res) => {
            let cenaOd = req.body.cenaOd;
            let cenaDo = req.body.cenaDo;
            let kvadraturaOd = req.body.kvadraturaOd;
            let kvadraturaDo = req.body.kvadraturaDo;
            let brojSobaOd = req.body.brojSobaOd;
            let brojSobaDo = req.body.brojSobaDo;
            let godinaIzgradnjeOd = req.body.godinaIzgradnjeOd;
            let godinaIzgradnjeDo = req.body.godinaIzgradnjeDo;
            let spratOd = req.body.spratOd;
            let spratDo = req.body.spratDo;
            let mesecneRezijeOd = req.body.mesecneRezijeOd;
            let mesecneRezijeDo = req.body.mesecneRezijeDo;
            let stanje = req.body.stanje;
            let grejanje = req.body.grejanje;
            let agencija = req.body.agencija;
            nekretnina_1.default.find({ prodato: 0,
                cena: { $gte: cenaOd, $lte: cenaDo },
                kvadratura: { $gte: kvadraturaOd, $lte: kvadraturaDo },
                brojSoba: { $gte: brojSobaOd, $lte: brojSobaDo },
                godinaIzgradnje: { $gte: godinaIzgradnjeOd, $lte: godinaIzgradnjeDo },
                sprat: { $gte: spratOd, $lte: spratDo },
                rezije: { $gte: mesecneRezijeOd, $lte: mesecneRezijeDo },
                stanje: { $in: stanje },
                grejanje: { $in: grejanje },
                agencija: { $regex: agencija }
            }).count().exec((err, br) => {
                if (err)
                    console.log(err);
                else
                    res.json(br);
            });
        };
        this.dohvatiNekretnineZaKorisnika = (req, res) => {
            let korisnickoIme = req.body.korisnickoIme;
            nekretnina_1.default.find({ oglasivac: korisnickoIme }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.prodajNekretninu = (req, res) => {
            let mesec = req.body.mesec;
            let id = req.body.id;
            nekretnina_1.default.findOneAndUpdate({ _id: id }, { $set: { prodato: mesec } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.izmeniNekretninu = (req, res) => {
            let slike = req.body.slike;
            console.log(req.body.slike);
            delete req.body.slike;
            nekretnina_1.default.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, (err, n) => {
                if (err)
                    console.log(err);
                else {
                    nekretnina_1.default.findOneAndUpdate({ _id: req.body.id }, { $push: { slike: slike } }, (err, n) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json(n);
                        }
                    });
                }
            });
        };
        this.dodajMikrolokaciju = (req, res) => {
            let m = new mikrolokacija_1.default(req.body);
            m.save().then(a => {
                res.status(200).json({ "poruka": "Mikrolokacija je uspesno dodata" });
            }).catch(err => {
                res.status(200).json({ "poruka": "Dogodila se greska" });
            });
        };
        this.obrisiMikrolokaciju = (req, res) => {
            let id = req.body.id;
            mikrolokacija_1.default.findOneAndDelete({ _id: id }, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ "poruka": "Mikrolokacija je uspesno obrisana" });
            });
        };
        this.postojiLiNekretninaNaMikrolokaciji = (req, res) => {
            let mikrolokacija = req.body.mikrolokacija;
            let grad = req.body.grad;
            let opstina = req.body.opstina;
            nekretnina_1.default.findOne({ mikrolokacija: mikrolokacija, opstina: opstina, grad: grad }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).json({ "n": n });
            });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map