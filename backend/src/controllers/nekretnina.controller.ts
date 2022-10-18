import * as express from 'express';
import Tip from '../models/tip';
import Grad from '../models/grad';
import Opstina from '../models/opstina';
import Mikrolokacija from '../models/mikrolokacija';
import Linija from '../models/linija'
import Nekretnina from '../models/nekretnina'
import nekretnina from '../models/nekretnina';

export class NekretninaController{

    dohvatiTipove = (req: express.Request, res: express.Response) =>{
        Tip.find({}, (err, tipovi)=>{
            if (err) console.log(err);
            else res.json(tipovi)
        })

    }
    dohvatiGradove = (req: express.Request, res: express.Response) =>{
        Grad.find({}, (err, g)=>{
            if (err) console.log(err);
            else res.json(g)
        })

    }
    dohvatiOpstine = (req: express.Request, res: express.Response) =>{
        Opstina.find({}, (err, o)=>{
            if (err) console.log(err);
            else res.json(o)
        })

    }
    dohvatiMikrolokacije = (req: express.Request, res: express.Response) =>{
        Mikrolokacija.find({}, (err, m)=>{
            if (err) console.log(err);
            else res.json(m)
        })

    }
    dohvatiLinije = (req: express.Request, res: express.Response) =>{
        Linija.find({}, (err, l)=>{
            if (err) console.log(err);
            else res.json(l)
        })

    }
    dodajNekretninu = (req: express.Request, res: express.Response) =>{
        console.log(req.body.slike)
        let n = new Nekretnina(req.body)
        n.save().then((v)=> {
            res.json({"poruka": "Uspesno sacuvano"})
        })

    }
    dohvatiNekretnine = (req: express.Request, res: express.Response) =>{
        let limit = req.body.limit
        let skip = req.body.skip

        Nekretnina.find({prodato : 0}).sort({_id: -1}).skip(skip).limit(limit).exec((err, n)=>{
            if (err) console.log(err)
            else res.json(n)
        })
    }
    dohvatiNekretninu = (req: express.Request, res: express.Response) =>{
        let id = req.body.id

        Nekretnina.findOne({_id : id}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n)
        })
    }

    jednostavnaPretaraga = (req: express.Request, res: express.Response) =>{
        let tip = req.body.tip
        let cena = req.body.cena
        let grad = req.body.grad
        let opstina = req.body.opstina
        let mikrolokacija = req.body.mikrolokacija
        let kvadratura = req.body.kvadratura
        let brojSoba = req.body.brojSoba

        let limit = req.body.limit
        let skip = req.body.skip

        Nekretnina.find({prodato : 0, tip: tip, cena: {$lte : cena}, kvadratura: {$gte : kvadratura}, brojSoba: {$gte : brojSoba}, grad: {$regex: grad}, opstina: {$regex: opstina} , mikrolokacija: {$regex: mikrolokacija}}).skip(skip).limit(limit).exec((err, n)=>{
            if (err) console.log(err);
            else res.json(n)
        })

    }
    jednostavnaPretragaPrebroj = (req: express.Request, res: express.Response) =>{
        let tip = req.body.tip
        let cena = req.body.cena
        let grad = req.body.grad
        let opstina = req.body.opstina
        let mikrolokacija = req.body.mikrolokacija
        let kvadratura = req.body.kvadratura
        let brojSoba = req.body.brojSoba

        console.log(req.body)

        Nekretnina.find({prodato : 0, tip: tip, cena: {$lte : cena}, kvadratura: {$gte : kvadratura}, brojSoba: {$gte : brojSoba}, grad: {$regex: grad}, opstina: {$regex: opstina} , mikrolokacija: {$regex: mikrolokacija}}).count().exec((err, n)=>{
            if (err) console.log(err);
            else res.json(n)
        })

    }

    prosecnaCena = (req: express.Request, res: express.Response) =>{
        let tip = req.body.tip
        let mikrolokacija = req.body.mikrolokacija

        
        Nekretnina.aggregate([
        { $match: { 'tip': tip , 'mikrolokacija': mikrolokacija} },
        { $project: { name: 1, cenaKvadrata: { $divide: [ "$cena", "$kvadratura" ] } }},
        {  
             $group: 
            { 
                _id: null, 
                average: {$avg: '$cenaKvadrata'}
            }

        }

        ]
        
        ,(err:any, n:any)=>{
           
            res.json(n)
        });
       

    }



    slozenaPretraga = (req: express.Request, res: express.Response) =>{
        
        let cenaOd = req.body.cenaOd
        let cenaDo = req.body.cenaDo
        let kvadraturaOd = req.body.kvadraturaOd
        let kvadraturaDo = req.body.kvadraturaDo
        let brojSobaOd = req.body.brojSobaOd
        let brojSobaDo = req.body.brojSobaDo
        let godinaIzgradnjeOd = req.body.godinaIzgradnjeOd
        let godinaIzgradnjeDo = req.body.godinaIzgradnjeDo
        let spratOd = req.body.spratOd
        let spratDo = req.body.spratDo
        let mesecneRezijeOd = req.body.mesecneRezijeOd
        let mesecneRezijeDo = req.body.mesecneRezijeDo

        let stanje = req.body.stanje
        let grejanje = req.body.grejanje
        let agencija = req.body.agencija
        

        let limit = req.body.limit
        let skip = req.body.skip

        Nekretnina.find({prodato : 0,
                        cena: {$gte: cenaOd, $lte : cenaDo}, 
                        kvadratura: {$gte : kvadraturaOd, $lte: kvadraturaDo}, 
                        brojSoba: {$gte : brojSobaOd, $lte:brojSobaDo},
                        godinaIzgradnje: {$gte: godinaIzgradnjeOd, $lte : godinaIzgradnjeDo},
                        sprat: {$gte : spratOd, $lte: spratDo},
                        rezije: {$gte : mesecneRezijeOd, $lte: mesecneRezijeDo},
                        stanje: {$in: stanje},
                        grejanje: {$in: grejanje},
                        agencija: {$regex : agencija}
        
        }).skip(skip).limit(limit).exec((err, n)=>{
            if (err) console.log(err);
            else res.json(n)
        })

    }

    slozenaPretragaPrebroj= (req: express.Request, res: express.Response) =>{
        
        let cenaOd = req.body.cenaOd
        let cenaDo = req.body.cenaDo
        let kvadraturaOd = req.body.kvadraturaOd
        let kvadraturaDo = req.body.kvadraturaDo
        let brojSobaOd = req.body.brojSobaOd
        let brojSobaDo = req.body.brojSobaDo
        let godinaIzgradnjeOd = req.body.godinaIzgradnjeOd
        let godinaIzgradnjeDo = req.body.godinaIzgradnjeDo
        let spratOd = req.body.spratOd
        let spratDo = req.body.spratDo
        let mesecneRezijeOd = req.body.mesecneRezijeOd
        let mesecneRezijeDo = req.body.mesecneRezijeDo

        let stanje = req.body.stanje
        let grejanje = req.body.grejanje
        let agencija = req.body.agencija
        

        Nekretnina.find({prodato : 0,
                        cena: {$gte: cenaOd, $lte : cenaDo}, 
                        kvadratura: {$gte : kvadraturaOd, $lte: kvadraturaDo}, 
                        brojSoba: {$gte : brojSobaOd, $lte:brojSobaDo},
                        godinaIzgradnje: {$gte: godinaIzgradnjeOd, $lte : godinaIzgradnjeDo},
                        sprat: {$gte : spratOd, $lte: spratDo},
                        rezije: {$gte : mesecneRezijeOd, $lte: mesecneRezijeDo},
                        stanje: {$in: stanje},
                        grejanje: {$in: grejanje},
                        agencija: {$regex : agencija}
        
        }).count().exec((err, br)=>{
            if (err) console.log(err);
            else res.json(br)
        })

    }

    dohvatiNekretnineZaKorisnika = (req: express.Request, res: express.Response) =>{

        let korisnickoIme = req.body.korisnickoIme        

        Nekretnina.find({oglasivac : korisnickoIme}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n)
        })
    }

    prodajNekretninu = (req: express.Request, res: express.Response) =>{

        let mesec = req.body.mesec
        let id = req.body.id        

        Nekretnina.findOneAndUpdate({_id : id}, {$set: {prodato : mesec}}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n)
        })
    }

    izmeniNekretninu = (req: express.Request, res: express.Response) =>{
        let slike = req.body.slike
        console.log(req.body.slike)
        delete req.body.slike
        
        Nekretnina.findOneAndUpdate({_id: req.body.id}, { $set: req.body }, (err, n)=>{
            if (err) console.log(err)
            else {
                Nekretnina.findOneAndUpdate({_id: req.body.id}, { $push: {slike: slike}}, (err, n)=>{
                    if (err) console.log(err)
                    else {
                        res.json(n)
                    
                    }
                });
            
            }
        });

    }

    dodajMikrolokaciju= (req: express.Request, res: express.Response) =>{
        
        let m = new Mikrolokacija(req.body)
        m.save().then(a => {
            res.status(200).json({ "poruka" : "Mikrolokacija je uspesno dodata"})
        }).catch(err => {
            res.status(200).json({ "poruka" : "Dogodila se greska"})
        })


    }

    obrisiMikrolokaciju = (req: express.Request, res: express.Response) =>{
        
        let id = req.body.id
        Mikrolokacija.findOneAndDelete({_id: id}, (err, m)=>{
            if (err) console.log(err)
            else  res.status(200).json({ "poruka" : "Mikrolokacija je uspesno obrisana"})
        })
    }

    postojiLiNekretninaNaMikrolokaciji = (req: express.Request, res: express.Response) =>{
        
        let mikrolokacija = req.body.mikrolokacija
        let grad = req.body.grad
        let opstina = req.body.opstina
        Nekretnina.findOne({mikrolokacija: mikrolokacija, opstina: opstina, grad:grad}, (err, n)=>{
            if (err) console.log(err)
            else  res.status(200).json({ "n" : n})
        })
    }

}