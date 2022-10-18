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
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css']
})
export class AddRealEstateComponent implements OnInit {

  constructor(private servis: RealestatesService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder,
    private ruter: Router, private _snackBar: MatSnackBar) { 
  }



  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    if (this.ulogovan == null || (this.ulogovan.tip!="A" && this.ulogovan.tip!="S")){
      this.ruter.navigate([''])
    }
    
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
    })
    this.servis.dohvatiLinije().subscribe((l: Linija[])=>{
      this.linije = l.map(val =>{
        return val.naziv
      })
    })
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
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
      oglasivac: ['', []],
      agencija: ['', []],
      prodato: [0, []],
      poslednjaIzmena: ["9 November 2021 16:16:02 GMT+0100", []], 
      slika: ['', []]
  })

  ulogovan : Korisnik

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
    let grad = this.addRealestateForm.controls["grad"].value
    let opstina = this.addRealestateForm.controls["opstina"].value
    let mikrolokacija = this.addRealestateForm.controls["mikrolokacija"].value
    let m = this.sveMikrolokacije.find((m) => {return m.naziv == mikrolokacija
    && m.grad == grad && m.opstina==opstina})
    if (m!=null){
      this.ulice = m.ulice
    }
    
  }

  greska : string
  slikaGreska : string = ""

  dodajNekretninu(){

    console.log(this.addRealestateForm.controls["brojSoba"].value)
    if (this.addRealestateForm.valid ){
      if (this.numberOfImages >= 3 && this.numberOfImages <= 6){
        this.upisiUBazuNovuNekretninu();
      }
      else {
        this.slikaGreska = "Mozete uneti izmedju 3 i 6 slika za nekretninu"
      }
      
    }
  }


  image : File[] = []
  chosen : boolean = false
  numberOfImages = 0
  slikeUrl = []


  fileChosen(event: any){
    if (this.numberOfImages == 6){
      this.slikaGreska = "Mozete maksimalno 6 slika uneti"
      return
    }
    if (event.target.value){
     
      this.image[this.numberOfImages] = <File> event.target.files[0]
      this.numberOfImages++
      console.log(this.numberOfImages)

      let objectURL = URL.createObjectURL(event.target.files[0]);       
      this.slikeUrl.push(this.sanitizer.bypassSecurityTrustUrl(objectURL)); 

    } 
  }



  upisiUBazuNovuNekretninu(){

    this.addRealestateForm.controls["oglasivac"].setValue(this.ulogovan.korisnickoIme)
    this.addRealestateForm.controls["agencija"].setValue(this.ulogovan.agencija)
    let fd = new FormData()

    Object.keys(this.addRealestateForm.controls).forEach(key => {
      if (key == "linije") fd.append(key, this.addRealestateForm.controls[key].value.join(","))
      else if  (key == "slika"){}
      else fd.append(key, this.addRealestateForm.controls[key].value.toString())
    });

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
