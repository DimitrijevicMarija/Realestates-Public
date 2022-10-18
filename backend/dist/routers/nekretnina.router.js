"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nekretnina_controller_1 = require("../controllers/nekretnina.controller");
const nekretninaRouter = express_1.default.Router();
const multer = require("multer");
var path = require('path');
const upload = multer({ dest: "./uploads/" });
nekretninaRouter.route('/dohvatiTipove').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiTipove(req, res));
nekretninaRouter.route('/dohvatiGradove').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiGradove(req, res));
nekretninaRouter.route('/dohvatiOpstine').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiOpstine(req, res));
nekretninaRouter.route('/dohvatiMikrolokacije').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiMikrolokacije(req, res));
nekretninaRouter.route('/dohvatiLinije').get((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiLinije(req, res));
nekretninaRouter.route('/dohvatiNekretnine').post((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiNekretnine(req, res));
nekretninaRouter.route('/dohvatiNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiNekretninu(req, res));
nekretninaRouter.post("/dodajNekretninu", upload.array("slike"), function (req, res, next) {
    let slike = [];
    req.files.forEach((file) => {
        slike.push(file["filename"]);
    });
    req.body.slike = slike;
    console.log(slike);
    new nekretnina_controller_1.NekretninaController().dodajNekretninu(req, res);
});
nekretninaRouter.route('/jednostavnaPretaraga').post((req, res) => new nekretnina_controller_1.NekretninaController().jednostavnaPretaraga(req, res));
nekretninaRouter.route('/jednostavnaPretragaPrebroj').post((req, res) => new nekretnina_controller_1.NekretninaController().jednostavnaPretragaPrebroj(req, res));
nekretninaRouter.route('/prosecnaCena').post((req, res) => new nekretnina_controller_1.NekretninaController().prosecnaCena(req, res));
nekretninaRouter.route('/slozenaPretraga').post((req, res) => new nekretnina_controller_1.NekretninaController().slozenaPretraga(req, res));
nekretninaRouter.route('/slozenaPretragaPrebroj').post((req, res) => new nekretnina_controller_1.NekretninaController().slozenaPretragaPrebroj(req, res));
nekretninaRouter.route('/dohvatiNekretnineZaKorisnika').post((req, res) => new nekretnina_controller_1.NekretninaController().dohvatiNekretnineZaKorisnika(req, res));
nekretninaRouter.route('/prodajNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().prodajNekretninu(req, res));
nekretninaRouter.post("/izmeniNekretninu", upload.array("slike"), function (req, res, next) {
    let slike = [];
    req.files.forEach((file) => {
        slike.push(file["filename"]);
    });
    req.body.slike = slike;
    new nekretnina_controller_1.NekretninaController().izmeniNekretninu(req, res);
});
nekretninaRouter.route('/dodajMikrolokaciju').post((req, res) => new nekretnina_controller_1.NekretninaController().dodajMikrolokaciju(req, res));
nekretninaRouter.route('/obrisiMikrolokaciju').post((req, res) => new nekretnina_controller_1.NekretninaController().obrisiMikrolokaciju(req, res));
nekretninaRouter.route('/postojiLiNekretninaNaMikrolokaciji').post((req, res) => new nekretnina_controller_1.NekretninaController().postojiLiNekretninaNaMikrolokaciji(req, res));
exports.default = nekretninaRouter;
//# sourceMappingURL=nekretnina.router.js.map