"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
const multer = require("multer");
var path = require('path');
const upload = multer({ dest: "./uploads/" });
korisnikRouter.route('/uloguj').post((req, res) => new korisnik_controller_1.KorisnikController().uloguj(req, res));
korisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
//upload.array("profilna", 1) ili bez 1
korisnikRouter.post("/registruj", upload.single("profilna"), function (req, res, next) {
    req.body.profilna = req.file.filename;
    //console.log(req)
    new korisnik_controller_1.KorisnikController().registruj(req, res);
});
korisnikRouter.route('/dohvatiKorisnike').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnike(req, res));
korisnikRouter.route('/potvrdiOdbijKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().potvrdiOdbijKorisnika(req, res));
korisnikRouter.route('/profilna').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiProfilnu(req, res));
korisnikRouter.route('/obrisiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().obrisiKorisnika(req, res));
korisnikRouter.route('/dodajAgenciju').post((req, res) => new korisnik_controller_1.KorisnikController().dodajAgenciju(req, res));
korisnikRouter.route('/dohvatiAgencije').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiAgencije(req, res));
korisnikRouter.route('/izmeni').post((req, res) => new korisnik_controller_1.KorisnikController().izmeni(req, res));
korisnikRouter.post("/izmeniProfilnu", upload.single("profilna"), function (req, res, next) {
    console.log("IZMENA PROFILNE");
    console.log(req);
    req.body.profilna = req.file.filename;
    new korisnik_controller_1.KorisnikController().izmeniProfilnu(req, res);
});
korisnikRouter.route('/dohvatiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res));
korisnikRouter.route('/dohvatiAgenciju').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiAgenciju(req, res));
korisnikRouter.route('/dodajUOmiljene').post((req, res) => new korisnik_controller_1.KorisnikController().dodajUOmiljene(req, res));
korisnikRouter.route('/ukloniIzOmiljenih').post((req, res) => new korisnik_controller_1.KorisnikController().ukloniIzOmiljenih(req, res));
korisnikRouter.route('/promeniPodatkeZaProdavca').post((req, res) => new korisnik_controller_1.KorisnikController().promeniPodatkeZaProdavca(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.router.js.map