import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { RealestatesService } from '../realestates.service';
import { Tip } from '../models/tip';
import { Grad } from '../models/grad';
import { Opstina } from '../models/opstina';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Linija } from '../models/linija';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-from-json',
  templateUrl: './add-from-json.component.html',
  styleUrls: ['./add-from-json.component.css']
})
export class AddFromJSONComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer, private ruter: Router, private servis: RealestatesService, private _snackBar: MatSnackBar) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
    
    if (this.ulogovan == null || (this.ulogovan.tip!="A" && this.ulogovan.tip!="S")){
      this.ruter.navigate([''])
    }

    this.servis.dohvatiTipoveNekretnina().subscribe((t: Tip[])=>{
      this.sviTipovi = t
    })
    this.servis.dohvatiGradove().subscribe((g: Grad[])=>{
        this.sviGradovi = g;
    })
    this.servis.dohvatiOpstine().subscribe((o: Opstina[])=>{
      this.sveOpstine = o;
    })
    this.servis.dohvatiMikrolokacije().subscribe((m: Mikrolokacija[])=>{
      this.sveMikrolokacije = m;
    })
    this.servis.dohvatiLinije().subscribe((l: Linija[])=>{
      this.sveLinije = l.map(val =>{
        return val.naziv
      })
    })
  }
  
  sviTipovi : Tip[] = []
  sviGradovi : Grad[] = []
  sveOpstine : Opstina[] = [] 
  sveMikrolokacije: Mikrolokacija[] = []
  sveLinije = []


  ulogovan: Korisnik

  jsonChosen = false
  validJson = true
  realestate


  naziv : string
  tip : string
  opis : string
  grad : string
  opstina : string
  mikrolokacija : string
  ulica : string
  kvadratura : number
  brojSoba : number //5+ je 6
  godinaIzgradnje : number
  stanje : string
  grejanje : string
  sprat : number
  ukupnaSpratnost : number 
  rezije : number
  cena : number
  linije : string // samo string 25, 25P

  //karakteristike 
  parking : boolean  //true - false
  terasa : boolean
  lodja : boolean
  francBalkon : boolean
  lift : boolean
  podrum : boolean
  garaza : boolean
  basta : boolean
  klima : boolean
  internet : boolean
  interfon : boolean
  telefon : boolean

  oglasivac : string
  agencija : string // cuvamo agenciju jer agent moze da je promeni
  prodato : number = 0 //1-12 kao mesec
  poslednjaIzmena : string = "9 November 2021 16:16:02 GMT+0100"
  
  
  fileChosen(event: any){
   
    if (event.target.value){
      var reader = new FileReader();
      reader.onload = (e) => {
        let result = reader.result
        console.log(result);
        var obj = JSON.parse(result.toString());
        this.realestate = obj.Realestate
        
        this.jsonChosen = true
      };
      reader.readAsText(event.target.files[0]);
    }
    else{
      this.jsonChosen = false
    } 
  }



  karakteristike : Array<String>

  checkJSON(){
    if (this.realestate == undefined){
      this.validJson = false
      return
    }

    if (this.realestate.Name == undefined
      || this.realestate.Type == undefined
      || this.realestate.About == undefined
      || this.realestate.City == undefined
      || this.realestate.Municipality == undefined
      || this.realestate.Microlocation == undefined
      || this.realestate.Street == undefined
      || this.realestate.Area == undefined
      || this.realestate.Rooms == undefined
      || this.realestate.ConstructionYear == undefined
      || this.realestate.State == undefined
      || this.realestate.Heating == undefined
      || this.realestate.Floor == undefined
      || this.realestate.TotalFloors == undefined
      || this.realestate.MonthlyUtilities == undefined
      || this.realestate.Price == undefined
      || this.realestate.Parking == undefined
      || this.realestate.Characteristics == undefined
      || this.realestate.BusLines == undefined
    
    ){
      this.validJson = false
      return
    }
    
    this.naziv = this.realestate.Name
    this.tip = this.realestate.Type
    if (this.sviTipovi.find(t => t.naziv == this.tip) == null){
      this.validJson = false
      return
    }
    
    this.opis = this.realestate.About
    this.grad = this.realestate.City
    if (this.sviGradovi.find(g => g.naziv == this.grad) == null){
      this.validJson = false
      return
    }
    
    this.opstina = this.realestate.Municipality
    if (this.sveOpstine.find(o => o.naziv == this.opstina) == null){
      this.validJson = false
      return
    }
    
    this.mikrolokacija = this.realestate.Microlocation
    let m = this.sveMikrolokacije.find(m => m.naziv == this.mikrolokacija)
    if (m == null){
      this.validJson = false
      return
    }
    
    this.ulica = this.realestate.Street
    if (m.ulice.find(u => u == this.ulica) == null){
      this.validJson = false
      return
    }
    this.kvadratura = this.realestate.Area
    this.brojSoba = this.realestate.Rooms
    this.godinaIzgradnje = this.realestate.ConstructionYear
    this.stanje = this.realestate.State.charAt(0).toUpperCase() + this.realestate.State.slice(1)
    this.grejanje = this.realestate.Heating.charAt(0).toUpperCase() + this.realestate.Heating.slice(1)
    this.sprat = this.realestate.Floor
    this.ukupnaSpratnost = this.realestate.TotalFloors
    this.rezije = this.realestate.MonthlyUtilities
    this.cena = this.realestate.Price
    this.linije = this.realestate.BusLines

    this.linije.split(",").forEach(linija =>{
      if (this.sveLinije.find(l => l == linija.trim()) == null){
        this.validJson = false
        return
      }
    })
    
    this.parking = this.realestate.Parking == "DA" ? true : false
   
    this.karakteristike = this.realestate.Characteristics

    this.terasa = this.karakteristike.includes("Terasa") ? true : false
    this.lodja = this.karakteristike.includes("Lodja") ? true : false
    this.francBalkon = this.karakteristike.includes("Francuski balkon") ? true : false
    this.lift = this.karakteristike.includes("Lift") ? true : false
    this.garaza = this.karakteristike.includes("Garaža") ? true : false
    this.podrum = this.karakteristike.includes("Podrum") ? true : false
    this.basta = this.karakteristike.includes("Bašta") ? true : false
    this.klima = this.karakteristike.includes("Klima") ? true : false
    this.internet = this.karakteristike.includes("Internet") ? true : false
    this.interfon = this.karakteristike.includes("Interfon") ? true : false
    this.telefon = this.karakteristike.includes("Telefon") ? true : false


    //EVENTUALNO DA PROVERIS DA LI SU OKEJ PODACI ZA AGENTA
    
  }


  image : File[] = []
  numberOfImages = 0
  slikeUrl = []
  slikaGreska = ""

  imageChosen(event: any){
    if (this.numberOfImages == 6){
      this.slikaGreska = "Mozete maksimalno 6 slika uneti"
      return
    }
    if (event.target.value){
     
      this.image[this.numberOfImages] = <File> event.target.files[0]
      this.numberOfImages++

      let objectURL = URL.createObjectURL(event.target.files[0]);       
      this.slikeUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL)); 

    } 
  }

  dodajNekretninu(){

    this.oglasivac = this.ulogovan.korisnickoIme
    this.agencija = this.ulogovan.agencija
    let fd = new FormData()

    fd.append("naziv", this.naziv)
    fd.append("tip", this.tip)
    fd.append("opis", this.opis)
    fd.append("grad", this.grad)
    fd.append("opstina", this.opstina)
    fd.append("mikrolokacija", this.mikrolokacija)
    fd.append("ulica", this.ulica)
    fd.append("kvadratura", this.kvadratura.toString())
    fd.append("brojSoba", this.brojSoba.toString())
    fd.append("godinaIzgradnje", this.godinaIzgradnje.toString())
    fd.append("stanje", this.stanje)
    fd.append("grejanje", this.grejanje)
    fd.append("sprat", this.sprat.toString())
    fd.append("ukupnaSpratnost", this.ukupnaSpratnost.toString())
    fd.append("rezije", this.rezije.toString())
    fd.append("cena", this.cena.toString())
    fd.append("linije", this.linije)
    fd.append("parking", "" + this.parking)
    fd.append("terasa", "" + this.terasa)
    fd.append("lodja", "" + this.lodja)
    fd.append("francBalkon", "" + this.francBalkon)
    fd.append("lift", "" + this.lift)
    fd.append("podrum", "" + this.podrum)
    fd.append("garaza", "" + this.garaza)
    fd.append("basta", "" + this.basta)
    fd.append("klima", "" + this.klima)
    fd.append("interfon", "" + this.interfon)
    fd.append("internet", "" + this.internet)
    fd.append("telefon", "" + this.telefon)


    fd.append("oglasivac", this.oglasivac)
    fd.append("agencija", this.agencija)
    fd.append("prodato", this.prodato.toString())
    fd.append("poslednjaIzmena", this.poslednjaIzmena)

    for (let i = 0; i < this.numberOfImages; i++){
        fd.append("slike", this.image[i])
    }
    

    this.servis.dodajNekretninu(fd).subscribe((resp)=>{
      this._snackBar.open("Nekretnina je uspesno dodata", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
      this.ruter.navigate(['myRealestates'])
    })

  }

}
