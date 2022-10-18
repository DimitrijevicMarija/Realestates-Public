import * as express from 'express';
import Korisnik from '../models/korisnik';
import Agencija from '../models/agencija'


export class KorisnikController{

    uloguj = (req: express.Request, res: express.Response) =>{
       
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({'korisnickoIme': korisnickoIme}, (err, korisnik)=>{
            if (err) console.log(err)
            else {
                if (korisnik == null){
                    res.status(200).json({"poruka" : "Pogresni kredencijali"})
                }
                else {
                    Korisnik.findOne({'korisnickoIme': korisnickoIme, 'lozinka': lozinka}, (err, korisnik)=>{
                        if (err) console.log(err)
                        else {
                            if(korisnik==null){
                                res.status(200).json({"poruka" : "Pogresni kredencijali"})
                            }
                            else{
                                res.status(200).json({"poruka" : "",
                                "korisnik" : korisnik})
                            }
                        }
                    })
                }
            }
        })
       
    }
    registruj = (req: express.Request, res: express.Response) =>{
        let korisnickoImeGreska = ""
        let imejlGreska = ""
        Korisnik.findOne({'korisnickoIme': req.body.korisnickoIme}, (err, korisnik)=>{
            if (err) console.log(err)
            if (korisnik != null) korisnickoImeGreska = "Korisnicko ime nije jedinstveno"
            Korisnik.findOne({'imejl': req.body.imejl}, (err, korisnik2)=>{
                if (err) console.log(err)
                if (korisnik2 != null) imejlGreska = "I-mejl adresa nije jedinstvena"
    
                if (korisnickoImeGreska == "" && imejlGreska == ""){
                    let korisnikNovi = new Korisnik(req.body)
                    korisnikNovi.save().then(k => {
                        res.status(200).json({ "korisnickoImeGreska" : "",
                                                "imejlGreska" : "",
                                                "poruka" : "Korisnik je uspesno dodat"})
                    }).catch(err => {
                        res.status(400).json({ "korisnickoImeGreska" : "",
                                                "imejlGreska" : "",
                                                "poruka" : "Dogodila se greska"})
                    })
                }
                else {
                    res.status(200).json({ "korisnickoImeGreska" : korisnickoImeGreska,
                                            "imejlGreska" : imejlGreska})
                }
            })
            
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        Korisnik.updateOne({'korisnickoIme': korisnickoIme}, {$set : {'lozinka' : lozinka}},  (err, korisnik)=>{
                if (err) {
                    res.status(200).json({"poruka" : "Dogodila se greska"})
                }
                else  res.status(200).json({"poruka" : "Uspesno promenjena lozinka"})
                         
        })
       
    }

    dohvatiKorisnike = (req: express.Request, res: express.Response) =>{
        Korisnik.find({}, (err, korisnici)=>{
            res.json(korisnici)
        })
       
    }

    potvrdiOdbijKorisnika = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let odobren = req.body.odobren;

        Korisnik.updateOne({'korisnickoIme': korisnickoIme}, {$set : {'odobren' : odobren}},  (err, korisnik)=>{
                if (err) {
                    res.status(200).json({"poruka" : "Dogodila se greska"})
                }
                else  res.status(200).json({"poruka" : "Uspesno promenjena status korisnika"})
                         
        })
       
    }

    dohvatiProfilnu  = (req: express.Request, res: express.Response) =>{
        let profilna = req.body.profilna;
        var path = require('path');
       
        let lastindex = __dirname.lastIndexOf(path.sep);
        lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
        let parentFolder = __dirname.substr(0,lastindex);
        //console.log(parentFolder)
        res.sendFile(`${parentFolder}${path.sep}uploads${path.sep}${profilna}`)
       
    }

    obrisiKorisnika = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;

        Korisnik.findOneAndDelete({'korisnickoIme': korisnickoIme}, (err, korisnik)=>{
            if (err) {
                res.status(200).json({"poruka" : "Dogodila se greska"})
            }
            else  res.status(200).json({"poruka" : "Uspesno obrisan korisnik"})
                     
        })
    }
    dodajAgenciju = (req: express.Request, res: express.Response) =>{
        let agencija = new Agencija(req.body)
        agencija.save().then(a => {
            res.status(200).json({ "poruka" : "Agencija je uspesno dodata"})
        }).catch(err => {
            res.status(200).json({ "poruka" : "Dogodila se greska"})
        })
    }
    dohvatiAgencije = (req: express.Request, res: express.Response) =>{
        Agencija.find({}, (err, a)=>{
            res.json(a)
        })
       
    }

    izmeni = (req: express.Request, res: express.Response) =>{
        Korisnik.findOneAndUpdate({'korisnickoIme': req.body.korisnickoIme}, 
        {$set : {ime : req.body.ime, prezime : req.body.prezime, grad : req.body.grad,
            telefon : req.body.telefon,  datumRodjenja : req.body.datumRodjenja,
            agencija : req.body.agencija, licenca : req.body.licenca, tip : req.body.tip }}
        ,(err, korisnik)=>{
            if (err){
                console.log(err)
                res.status(200).json({ "poruka" : "Dogodila se greska"})
            }
            else {
                res.status(200).json({ "poruka" : "Korisnik je uspesno izmenjen"})
            }
           
        })
       
                   
    }
    izmeniProfilnu = (req: express.Request, res: express.Response) =>{
        Korisnik.findOneAndUpdate({'korisnickoIme': req.body.korisnickoIme}, 
        {$set : {profilna : req.body.profilna }}
        ,(err, korisnik)=>{
            if (err){
                console.log(err)
                res.status(200).json({ "poruka" : "Dogodila se greska"})
            }
            else {
                res.status(200).json({ "poruka" : "Korisniku je uspesno izmenjena profilna"})
            }
           
        })
       
                   
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime
        Korisnik.findOne({korisnickoIme : kor_ime}, (err, k)=>{
            res.json(k)
        })
       
    }
    dohvatiAgenciju = (req: express.Request, res: express.Response) =>{
        let pib = req.body.pib
        Agencija.findOne({pib : pib}, (err, a)=>{
            res.json(a)
        })
       
    }

    dodajUOmiljene = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme
        let idN = req.body.idN
        Korisnik.updateOne({korisnickoIme:korisnickoIme}, {$push: {omiljene : idN}}, (err, k)=>{
            if (err) console.log(err)    
            else res.json("OKEJ")
        })
       
       
    }

    ukloniIzOmiljenih = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme
        let idN = req.body.idN
        Korisnik.updateOne({korisnickoIme:korisnickoIme}, {$pull: {omiljene : idN}}, (err, k)=>{
            if (err) console.log(err)    
            else res.json("OKEJ")
        })
       
       
    }

    promeniPodatkeZaProdavca = (req: express.Request, res: express.Response) =>{
        let korisnickoIme = req.body.korisnickoIme;
        let tip = req.body.tip
        let telefon = req.body.telefon
        let agencija = req.body.agencija
        let imejl = req.body.imejl
        let licenca = req.body.licenca

        Korisnik.updateOne({'korisnickoIme': korisnickoIme}, 
        {$set : {'tip' : tip, 'telefon' : telefon, 'agencija': agencija, 'imejl': imejl, 'licenca': licenca}},  (err, korisnik)=>{
                if (err) {
                    res.status(200).json({"poruka" : "Dogodila se greska"})
                }
                else  res.status(200).json({"poruka" : "Uspesno promenjeni podaci"})
                         
        })
       
    }
} 