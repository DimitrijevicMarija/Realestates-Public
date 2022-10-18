import { Component, OnInit } from '@angular/core';


import { DomSanitizer } from '@angular/platform-browser';
import { Agencija } from '../models/agencija';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { RealestatesService } from '../realestates.service';
import { Tip } from '../models/tip';
import { Opstina } from '../models/opstina';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Linija } from '../models/linija';
import { Nekretnina } from '../models/nekretnina';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-realestate',
  templateUrl: './edit-realestate.component.html',
  styleUrls: ['./edit-realestate.component.css']
})
export class EditRealestateComponent implements OnInit {

  nekretnina : Nekretnina = null

  constructor(private servis: RealestatesService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private korisnikServis : UsersService, private ruter: Router,  private _snackBar: MatSnackBar) { 


  }



  ngOnInit(): void {

    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || (ulogovan.tip!="A" && ulogovan.tip!="S")){
      this.ruter.navigate([''])
    }
    
    this.nekretnina = JSON.parse(localStorage.getItem("nekretninaZaIzmenu"))
    if (this.nekretnina == null){
      this.ruter.navigate([''])
    }
    
    this.addRealestateForm.controls["naziv"].setValue(this.nekretnina.naziv)
    this.addRealestateForm.controls["tip"].setValue(this.nekretnina.tip)
    this.addRealestateForm.controls["opis"].setValue(this.nekretnina.opis)
    this.addRealestateForm.controls["grad"].setValue(this.nekretnina.grad)
    this.addRealestateForm.controls["opstina"].setValue(this.nekretnina.opstina)
    this.addRealestateForm.controls["mikrolokacija"].setValue(this.nekretnina.mikrolokacija)
    
    this.addRealestateForm.controls["kvadratura"].setValue(this.nekretnina.kvadratura)
   
   
    this.addRealestateForm.controls["brojSoba"].setValue(this.nekretnina.brojSoba.toString())
    
    
    this.addRealestateForm.controls["godinaIzgradnje"].setValue(this.nekretnina.godinaIzgradnje)
    this.addRealestateForm.controls["stanje"].setValue(this.nekretnina.stanje)
    this.addRealestateForm.controls["grejanje"].setValue(this.nekretnina.grejanje)
    this.addRealestateForm.controls["sprat"].setValue(this.nekretnina.sprat)
    this.addRealestateForm.controls["ukupnaSpratnost"].setValue(this.nekretnina.ukupnaSpratnost)
    this.addRealestateForm.controls["rezije"].setValue(this.nekretnina.rezije)
    this.addRealestateForm.controls["cena"].setValue(this.nekretnina.cena)
    this.addRealestateForm.controls["linije"].setValue(this.nekretnina.linije.split(","))
    this.addRealestateForm.controls["parking"].setValue(this.nekretnina.parking)
    this.addRealestateForm.controls["terasa"].setValue(this.nekretnina.terasa)
    this.addRealestateForm.controls["lodja"].setValue(this.nekretnina.lodja)
    this.addRealestateForm.controls["francBalkon"].setValue(this.nekretnina.francBalkon)
    this.addRealestateForm.controls["lift"].setValue(this.nekretnina.lift)
    this.addRealestateForm.controls["podrum"].setValue(this.nekretnina.podrum)
    this.addRealestateForm.controls["garaza"].setValue(this.nekretnina.garaza)
    this.addRealestateForm.controls["basta"].setValue(this.nekretnina.basta)
    this.addRealestateForm.controls["klima"].setValue(this.nekretnina.klima)
    this.addRealestateForm.controls["interfon"].setValue(this.nekretnina.interfon)
    this.addRealestateForm.controls["internet"].setValue(this.nekretnina.internet)
    this.addRealestateForm.controls["telefon"].setValue(this.nekretnina.telefon)
    

    this.servis.dohvatiTipoveNekretnina().subscribe((t: Tip[])=>{
        this.tipovi = t
    })
    this.servis.dohvatiGradove().subscribe((g: Grad[])=>{
        this.gradovi = g;
    })
    this.servis.dohvatiOpstine().subscribe((o: Opstina[])=>{
      this.sveOpstine = o;
      this.opstine = o;
    })
    this.servis.dohvatiMikrolokacije().subscribe((m: Mikrolokacija[])=>{
      this.sveMikrolokacije = m;
      this.mikrolokacije = m;
      let mikrolok = m.find(x => x.naziv == this.nekretnina.mikrolokacija )
      this.ulice = mikrolok.ulice
      this.addRealestateForm.controls["ulica"].setValue(this.nekretnina.ulica)

    })
    this.servis.dohvatiLinije().subscribe((l: Linija[])=>{
      this.linije = l.map(val =>{
        return val.naziv
      })
    })
    document.querySelector('.mat-sidenav-content').scrollTop = 0;

    this.numberOfImages = this.nekretnina.slike.length
    this.nekretnina.slike.forEach(s =>{
      this.korisnikServis.dohvatiProfilnu(s).subscribe((data)=>{
        //this.images.push( new File([data], 'xx', { lastModified: new Date().getTime()}))      
        let objectURL = URL.createObjectURL(data);  
        this.slikeUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL))     
       
      }, error => {
        console.log(error);
      });

    })
   
  }


  addRealestateForm = this.formBuilder.group({
      naziv: ['', Validators.required],
      tip: ['', Validators.required],
      opis: ['', Validators.required],
      grad: ['', [Validators.required]],
      opstina: ['', Validators.required],
      mikrolokacija: ['', Validators.required],
      ulica: ['', Validators.required],
      kvadratura: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      brojSoba: ['', Validators.required],
      godinaIzgradnje: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      stanje: ['', Validators.required],
      grejanje: ['', Validators.required],
      sprat: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ukupnaSpratnost: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      rezije: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cena: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      linije: [[], []],
      parking: [false, []],
      terasa: [ false, []],
      lodja: [false, []],
      francBalkon: [false, []],
      lift: [false, []],
      podrum: [false, []],
      garaza: [false, []],
      basta: [false, []],
      klima: [false, []],
      interfon: [false, []],
      internet: [false, []],
      telefon: [false, []],
      slika: ['', []],
      poslednjaIzmena: ['', []]
  })

  

  tipovi : Tip[] = []
  gradovi : Grad[] = []
  sveOpstine : Opstina[] = [] //to su sve, da ne bismo dovlacili vise puta
  opstine : Opstina[] = [] // to su one koje se prikazuju
  sveMikrolokacije : Mikrolokacija[] = []
  mikrolokacije : Mikrolokacija[] = []
  ulice = []
  linije = []
 


  promenjenGrad(event){
    let grad = this.addRealestateForm.controls["grad"].value
    if (grad == "") this.opstine = this.sveOpstine
    else {
      this.opstine = this.sveOpstine.filter((o) => {
        return o.grad == grad
      })
      this.addRealestateForm.controls["opstina"].setValue("")
      
    }
  }
  promenjenaOpstina(event){
    let grad = this.addRealestateForm.controls["grad"].value
    let opstina = this.addRealestateForm.controls["opstina"].value
    if (opstina == "" || grad == "") this.mikrolokacije = this.sveMikrolokacije
    else {
      this.mikrolokacije = this.sveMikrolokacije.filter((m) => {
        return m.opstina == opstina && m.grad == grad
      })
      this.addRealestateForm.controls["mikrolokacija"].setValue("")
      
    }
  }

  promenjenaMikrolokacija(event){
    this.addRealestateForm.controls["ulica"].setValue("")
    let mikrolokacija = this.addRealestateForm.controls["mikrolokacija"].value
    let grad = this.addRealestateForm.controls["grad"].value
    let opstina = this.addRealestateForm.controls["opstina"].value
    let m = this.sveMikrolokacije.find((m) => {return m.naziv == mikrolokacija
      && m.grad == grad && m.opstina==opstina})
    if (m!=null){
      this.ulice = m.ulice
    }
  }

  greska : string
  slikaGreska : string = ""

  izmeniNekretninu(){
    let now = new Date();
    let lastEdit = new Date(this.nekretnina.poslednjaIzmena)
    
    if (now.getTime() - lastEdit.getTime() >= 60*60*1000){
      if (this.addRealestateForm.valid ){
        if (this.numberOfImages >= 3 && this.numberOfImages <= 6){
          this.addRealestateForm.controls["poslednjaIzmena"].setValue(now.toString())
          this.upisiUBazuIzmenjenuNekretninu();
        }
        else {
          this.slikaGreska = "Mozete uneti izmedju 3 i 6 slika za nekretninu"
        }
        
      }
    }
    else {
      this.greska = "Izmedju dve izmene mora proteci najmanje 1h"
    }
   
    
  }


  images : File[] = []
  chosen : boolean = false
  numberOfImages = 0
  numberOfNewImages = 0
  slikeUrl = []


  fileChosen(event: any){
    if (this.numberOfImages == 6){
      this.slikaGreska = "Mozete maksimalno 6 slika uneti"
      return
    }
    if (event.target.value){
     
      this.images[this.numberOfNewImages] = <File> event.target.files[0]
      this.numberOfImages++
      this.numberOfNewImages++
  
      let objectURL = URL.createObjectURL(event.target.files[0]);       
      this.slikeUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL)); 

    } 
  }



  upisiUBazuIzmenjenuNekretninu(){

    let fd = new FormData()

    Object.keys(this.addRealestateForm.controls).forEach(key => {
      if (key == "linije") fd.append(key, this.addRealestateForm.controls[key].value.join(","))
      else if  (key == "slika"){}
      else fd.append(key, this.addRealestateForm.controls[key].value.toString())
    });

    if (this.numberOfNewImages == 0)fd.append("slike", null)
    for (let i = 0; i < this.numberOfNewImages; i++){
        fd.append("slike", this.images[i])
    }
    

    fd.append("id", this.nekretnina._id)
    

    this.servis.izmeniNekretninu(fd).subscribe((resp)=>{
      this._snackBar.open("Uspesno izmenjena nekretnina", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
      this.ruter.navigate(['myRealestates'])
    })

   
  }

}
