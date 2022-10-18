import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { RealestatesService } from '../realestates.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private servis : RealestatesService, private korisnikServis : UsersService,
    private sanitizer: DomSanitizer, private ruter: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="K"){
      this.ruter.navigate([''])
    }
    
    if (localStorage.getItem("pretragaN") != null){
      console.log("OVDEE")
      this.pretrazenaCenaOd =  parseInt(localStorage.getItem("pretrazenaCenaOd"))
      this.pretrazenaCenaDo = parseInt(localStorage.getItem("pretrazenaCenaDo"))
      this.pretrazenaKvadraturaOd = parseInt(localStorage.getItem("pretrazenaKvadraturaOd"))
      this.pretrazenaKvadraturaDo = parseInt(localStorage.getItem("pretrazenaKvadraturaDo"))
      this.pretrazenBrojSobaOd = parseFloat(localStorage.getItem("pretrazenBrojSobaOd"))
      this.pretrazenBrojSobaDo = parseFloat(localStorage.getItem("pretrazenBrojSobaDo"))
      this.pretrazenaGodinaIzgradnjeOd = parseInt(localStorage.getItem("pretrazenaGodinaIzgradnjeOd"))
      this.pretrazenaGodinaIzgradnjeDo = parseInt(localStorage.getItem("pretrazenaGodinaIzgradnjeDo"))
      this.pretrazenSpratOd = parseInt(localStorage.getItem("pretrazenSpratOd"))
      this.pretrazenSpratDo = parseInt(localStorage.getItem("pretrazenSpratDo"))
      this.pretrazeneMesecneRezijeOd = parseInt(localStorage.getItem("pretrazeneMesecneRezijeOd"))
      this.pretrazeneMesecneRezijeDo = parseInt(localStorage.getItem("pretrazeneMesecneRezijeDo"))
      this.pretrazenOglasivac = localStorage.getItem("pretrazenOglasivac")
      this.pretrazenoStanjeNekretnine = JSON.parse(localStorage.getItem("pretrazenoStanjeNekretnine"))
      this.pretrazenTipGrejanja = JSON.parse(localStorage.getItem("pretrazenTipGrejanja"))

      this.trenutnaStranica = parseInt(localStorage.getItem("trenutnaStranicaN"))
      this.izvrsiPretragu()
    }
    else document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }
  
  searchForm = this.formBuilder.group({
    cenaOd: ['', Validators.pattern(/^\d*$/)],
    cenaDo: ['', Validators.pattern(/^\d*$/)],
    kvadraturaOd: ['', Validators.pattern(/^\d*$/)],
    kvadraturaDo: ['', Validators.pattern(/^\d*$/)],
    brojSobaOd: ['', []],
    brojSobaDo: ['', []],
    godinaIzgradnjeOd: ['', Validators.pattern(/^\d*$/)],
    godinaIzgradnjeDo: ['', Validators.pattern(/^\d*$/)],
    spratOd: ['', Validators.pattern(/^\d*$/)],
    spratDo: ['', Validators.pattern(/^\d*$/)],
    mesecneRezijeOd: ['', Validators.pattern(/^\d*$/)],
    mesecneRezijeDo: ['', Validators.pattern(/^\d*$/)],
    oglasivac: ['', []],
    stanjeNekretnine: ['', []],
    tipGrejanja: ['', []]
  })

  nekretnine : Nekretnina[] = []


  trenutnaStranica = 0
  ukupanBrojNekretnina = 0
  brojPoStranici = 10

  
  pretrazenaCenaOd = 0
  pretrazenaCenaDo = 100000000
  pretrazenaKvadraturaOd = 0
  pretrazenaKvadraturaDo = 100000000
  pretrazenBrojSobaOd = 0
  pretrazenBrojSobaDo = 7
  pretrazenaGodinaIzgradnjeOd = 0
  pretrazenaGodinaIzgradnjeDo = 4000
  pretrazenSpratOd = 0
  pretrazenSpratDo = 1000
  pretrazeneMesecneRezijeOd = 0
  pretrazeneMesecneRezijeDo = 100000000
  pretrazenOglasivac = "" //REGEX!!!
  pretrazenoStanjeNekretnine = []
  pretrazenTipGrejanja = []

  detaljnije(n: Nekretnina){
    localStorage.setItem("trenutnaNekretnina", JSON.stringify(n))
    this.ruter.navigate(['realestateDetails'])
  }

  
  handlePageEvent(event: PageEvent) {
    document.querySelector('.mat-sidenav-content').scrollTop = 800;
    this.trenutnaStranica = event.pageIndex
    localStorage.setItem("trenutnaStranicaN", this.trenutnaStranica.toString())
    this.popuniNekretnine()
    return event
  }




  trazi(){
    if (this.searchForm.valid){
      
      this.trenutnaStranica = 0

      this.pretrazenaCenaOd = this.searchForm.controls["cenaOd"].value == "" ? 0 : this.searchForm.controls["cenaOd"].value
      this.pretrazenaCenaDo = this.searchForm.controls["cenaDo"].value == "" ? 100000000 : this.searchForm.controls["cenaDo"].value


      this.pretrazenaKvadraturaOd = this.searchForm.controls["kvadraturaOd"].value == "" ? 0 : this.searchForm.controls["kvadraturaOd"].value
      this.pretrazenaKvadraturaDo = this.searchForm.controls["kvadraturaDo"].value == "" ? 100000000 : this.searchForm.controls["kvadraturaDo"].value

      this.pretrazenBrojSobaOd = this.searchForm.controls["brojSobaOd"].value == "" ? 0 : parseFloat(this.searchForm.controls["brojSobaOd"].value)
      this.pretrazenBrojSobaDo = this.searchForm.controls["brojSobaDo"].value == "" ? 7 : parseFloat(this.searchForm.controls["brojSobaDo"].value) 

      this.pretrazenaGodinaIzgradnjeOd = this.searchForm.controls["godinaIzgradnjeOd"].value == "" ? 0 : this.searchForm.controls["godinaIzgradnjeOd"].value
      this.pretrazenaGodinaIzgradnjeDo = this.searchForm.controls["godinaIzgradnjeDo"].value == "" ? 4000 : this.searchForm.controls["godinaIzgradnjeDo"].value
      

      this.pretrazenSpratOd = this.searchForm.controls["spratOd"].value == "" ? 0 : this.searchForm.controls["spratOd"].value
      this.pretrazenSpratDo = this.searchForm.controls["spratDo"].value == "" ? 1000 : this.searchForm.controls["spratDo"].value

      this.pretrazeneMesecneRezijeOd = this.searchForm.controls["mesecneRezijeOd"].value == "" ? 0 : this.searchForm.controls["mesecneRezijeOd"].value
      this.pretrazeneMesecneRezijeDo = this.searchForm.controls["mesecneRezijeDo"].value == "" ? 100000000 : this.searchForm.controls["mesecneRezijeDo"].value

      this.pretrazenoStanjeNekretnine = this.searchForm.controls["stanjeNekretnine"].value == []? ["Izvorno", "Renovirano", "LUX"] : this.searchForm.controls["stanjeNekretnine"].value

      this.pretrazenTipGrejanja = this.searchForm.controls["tipGrejanja"].value == []? ["Centralno grejanje", "Etazno grejanje", "TA pec", "Gas", "Podno", "Toplotne pumpe"] : this.searchForm.controls["tipGrejanja"].value

      if (this.searchForm.controls["oglasivac"].value == []){
        this.pretrazenOglasivac = ""
      }
      else if (this.searchForm.controls["oglasivac"].value.length == 2){
        this.pretrazenOglasivac = ""
      }
      else if (this.searchForm.controls["oglasivac"].value.includes("agencija")){
        this.pretrazenOglasivac = "."
      }
      else if (this.searchForm.controls["oglasivac"].value.includes("vlasnik")){
        this.pretrazenOglasivac = "^$"
      }
      
      
      localStorage.setItem("pretragaN", "pretragaN")
      localStorage.setItem("trenutnaStranicaN", this.trenutnaStranica.toString())
      localStorage.setItem("pretrazenaCenaOd", this.pretrazenaCenaOd.toString())
      localStorage.setItem("pretrazenaCenaDo", this.pretrazenaCenaDo.toString())
      localStorage.setItem("pretrazenaKvadraturaOd", this.pretrazenaKvadraturaOd.toString())
      localStorage.setItem("pretrazenaKvadraturaDo", this.pretrazenaKvadraturaDo.toString())
      localStorage.setItem("pretrazenBrojSobaOd", this.pretrazenBrojSobaOd.toString())
      localStorage.setItem("pretrazenBrojSobaDo", this.pretrazenBrojSobaDo.toString())
      localStorage.setItem("pretrazenaGodinaIzgradnjeOd", this.pretrazenaGodinaIzgradnjeOd.toString())
      localStorage.setItem("pretrazenaGodinaIzgradnjeDo", this.pretrazenaGodinaIzgradnjeDo.toString())
      localStorage.setItem("pretrazenSpratOd", this.pretrazenSpratOd.toString())
      localStorage.setItem("pretrazenSpratDo", this.pretrazenSpratDo.toString())
      localStorage.setItem("pretrazeneMesecneRezijeOd", this.pretrazeneMesecneRezijeOd.toString())
      localStorage.setItem("pretrazeneMesecneRezijeDo", this.pretrazeneMesecneRezijeDo.toString())
      localStorage.setItem("pretrazenOglasivac", this.pretrazenOglasivac)
      localStorage.setItem("pretrazenoStanjeNekretnine", JSON.stringify(this.pretrazenoStanjeNekretnine))
      localStorage.setItem("pretrazenTipGrejanja", JSON.stringify(this.pretrazenTipGrejanja))
      

      this.izvrsiPretragu()
    }
    

  }

  izvrsiPretragu(){
    
    this.servis.slozenaPretragaPrebroj(this.pretrazenaCenaOd, this.pretrazenaCenaDo, this.pretrazenaKvadraturaOd, this.pretrazenaKvadraturaDo, this.pretrazenBrojSobaOd, this.pretrazenBrojSobaDo, this.pretrazenaGodinaIzgradnjeOd, this.pretrazenaGodinaIzgradnjeDo, this.pretrazenSpratOd, this.pretrazenSpratDo, this.pretrazeneMesecneRezijeOd, this.pretrazeneMesecneRezijeDo, this.pretrazenoStanjeNekretnine, this.pretrazenTipGrejanja, this.pretrazenOglasivac)
    .subscribe((resp:number)=>{
      this.ukupanBrojNekretnina = resp
     
    })

    this.popuniNekretnine()
    document.querySelector('.mat-sidenav-content').scrollTop = 800;
  }


  brojSoba(br) : string{
    if (br == 6) return "5+"
    return br
  }

  nemaRezultata:boolean = false

  popuniNekretnine(){
    this.servis.slozenaPretraga(this.pretrazenaCenaOd, this.pretrazenaCenaDo, this.pretrazenaKvadraturaOd, this.pretrazenaKvadraturaDo, this.pretrazenBrojSobaOd, this.pretrazenBrojSobaDo, this.pretrazenaGodinaIzgradnjeOd, this.pretrazenaGodinaIzgradnjeDo, this.pretrazenSpratOd, this.pretrazenSpratDo, this.pretrazeneMesecneRezijeOd, this.pretrazeneMesecneRezijeDo, this.pretrazenoStanjeNekretnine, this.pretrazenTipGrejanja, this.pretrazenOglasivac,this.trenutnaStranica * this.brojPoStranici, this.brojPoStranici)
    .subscribe((n: Nekretnina[])=>{
      this.nekretnine = n
      if (n.length == 0) this.nemaRezultata = true
      else this.nemaRezultata = false
      this.nekretnine.forEach(n => {

        this.korisnikServis.dohvatiProfilnu(n.slike[0]).subscribe((data)=>{      
          let objectURL = URL.createObjectURL(data);       
          n.naslovnaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
        }, error => {
          console.log(error);
        });

        this.servis.prosecnaCena(n.tip, n.mikrolokacija).subscribe((resp)=>{
          n.prosecnaCena = resp[0]["average"].toFixed(2);
        })


      })
      
      
      
    })
   
  }


}
