import express from 'express';
import Korisnik from '../models/korisnik';
import { KorisnikController } from '../controllers/korisnik.controller';


const korisnikRouter = express.Router();
const multer = require("multer");
var path = require('path');
const upload = multer({ dest: "./uploads/" });


korisnikRouter.route('/uloguj').post(
    (req, res) => new KorisnikController().uloguj(req, res)
)
korisnikRouter.route('/promeniLozinku').post(
    (req, res) => new KorisnikController().promeniLozinku(req, res)
)

//upload.array("profilna", 1) ili bez 1
korisnikRouter.post("/registruj", upload.single("profilna"), function (req:any, res, next) {
    req.body.profilna = req.file.filename
    //console.log(req)
    new KorisnikController().registruj(req, res)
})


korisnikRouter.route('/dohvatiKorisnike').get(
    (req, res) => new KorisnikController().dohvatiKorisnike(req, res)
)

korisnikRouter.route('/potvrdiOdbijKorisnika').post(
    (req, res) => new KorisnikController().potvrdiOdbijKorisnika(req, res)
)
korisnikRouter.route('/profilna').post(
    (req, res) => new KorisnikController().dohvatiProfilnu(req, res)
)
korisnikRouter.route('/obrisiKorisnika').post(
    (req, res) => new KorisnikController().obrisiKorisnika(req, res)
)
korisnikRouter.route('/dodajAgenciju').post(
    (req, res) => new KorisnikController().dodajAgenciju(req, res)
)
korisnikRouter.route('/dohvatiAgencije').get(
    (req, res) => new KorisnikController().dohvatiAgencije(req, res)
)

korisnikRouter.route('/izmeni').post(
    (req, res) => new KorisnikController().izmeni(req, res)
)

korisnikRouter.post("/izmeniProfilnu", upload.single("profilna"), function (req:any, res, next) {
    console.log("IZMENA PROFILNE")
    console.log(req)
    req.body.profilna = req.file.filename
    new KorisnikController().izmeniProfilnu(req, res)
})

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikController().dohvatiKorisnika(req, res)
)
korisnikRouter.route('/dohvatiAgenciju').post(
    (req, res) => new KorisnikController().dohvatiAgenciju(req, res)
)
korisnikRouter.route('/dodajUOmiljene').post(
    (req, res) => new KorisnikController().dodajUOmiljene(req, res)
)
korisnikRouter.route('/ukloniIzOmiljenih').post(
    (req, res) => new KorisnikController().ukloniIzOmiljenih(req, res)
)
korisnikRouter.route('/promeniPodatkeZaProdavca').post(
    (req, res) => new KorisnikController().promeniPodatkeZaProdavca(req, res)
)





export default korisnikRouter;