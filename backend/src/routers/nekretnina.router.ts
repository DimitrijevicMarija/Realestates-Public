import express from 'express';
import { NekretninaController } from '../controllers/nekretnina.controller';


const nekretninaRouter = express.Router();
const multer = require("multer");
var path = require('path');
const upload = multer({ dest: "./uploads/" });


nekretninaRouter.route('/dohvatiTipove').get(
    (req, res) => new NekretninaController().dohvatiTipove(req, res)
)
nekretninaRouter.route('/dohvatiGradove').get(
    (req, res) => new NekretninaController().dohvatiGradove(req, res)
)
nekretninaRouter.route('/dohvatiOpstine').get(
    (req, res) => new NekretninaController().dohvatiOpstine(req, res)
)
nekretninaRouter.route('/dohvatiMikrolokacije').get(
    (req, res) => new NekretninaController().dohvatiMikrolokacije(req, res)
)
nekretninaRouter.route('/dohvatiLinije').get(
    (req, res) => new NekretninaController().dohvatiLinije(req, res)
)
nekretninaRouter.route('/dohvatiNekretnine').post(
    (req, res) => new NekretninaController().dohvatiNekretnine(req, res)
)
nekretninaRouter.route('/dohvatiNekretninu').post(
    (req, res) => new NekretninaController().dohvatiNekretninu(req, res)
)


nekretninaRouter.post("/dodajNekretninu", upload.array("slike"), function (req:any, res, next) {

    let slike: any[] = []
    req.files.forEach((file:any) => {
        slike.push(file["filename"])
    });
    req.body.slike = slike
    console.log(slike)
    new NekretninaController().dodajNekretninu(req, res)
})

nekretninaRouter.route('/jednostavnaPretaraga').post(
    (req, res) => new NekretninaController().jednostavnaPretaraga(req, res)
)

nekretninaRouter.route('/jednostavnaPretragaPrebroj').post(
    (req, res) => new NekretninaController().jednostavnaPretragaPrebroj(req, res)
)

nekretninaRouter.route('/prosecnaCena').post(
    (req, res) => new NekretninaController().prosecnaCena(req, res)
)

nekretninaRouter.route('/slozenaPretraga').post(
    (req, res) => new NekretninaController().slozenaPretraga(req, res)
)
nekretninaRouter.route('/slozenaPretragaPrebroj').post(
    (req, res) => new NekretninaController().slozenaPretragaPrebroj(req, res)
)
nekretninaRouter.route('/dohvatiNekretnineZaKorisnika').post(
    (req, res) => new NekretninaController().dohvatiNekretnineZaKorisnika(req, res)
)
nekretninaRouter.route('/prodajNekretninu').post(
    (req, res) => new NekretninaController().prodajNekretninu(req, res)
)

nekretninaRouter.post("/izmeniNekretninu", upload.array("slike"), function (req:any, res, next) {

    let slike: any[] = []
    req.files.forEach((file:any) => {
        slike.push(file["filename"])
    });
    req.body.slike = slike
    
    new NekretninaController().izmeniNekretninu(req, res)
})
nekretninaRouter.route('/dodajMikrolokaciju').post(
    (req, res) => new NekretninaController().dodajMikrolokaciju(req, res)
)
nekretninaRouter.route('/obrisiMikrolokaciju').post(
    (req, res) => new NekretninaController().obrisiMikrolokaciju(req, res)
)
nekretninaRouter.route('/postojiLiNekretninaNaMikrolokaciji').post(
    (req, res) => new NekretninaController().postojiLiNekretninaNaMikrolokaciji(req, res)
)







export default nekretninaRouter;