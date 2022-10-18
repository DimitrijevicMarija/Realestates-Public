import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { Tip } from '../models/tip';
import { RealestatesService } from '../realestates.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  constructor(private servis : RealestatesService, private korisnikServis : UsersService,
    private sanitizer: DomSanitizer, private ruter: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="K"){
      this.ruter.navigate([''])
    }

    this.servis.dohvatiTipoveNekretnina().subscribe((t: Tip[])=>{
      this.tipovi = t
    })
    if (localStorage.getItem("pretraga") != null){
      this.pretrazenTip = localStorage.getItem("pretrazenTip")
      this.pretrazenaCena = parseInt(localStorage.getItem("pretrazenaCena"))
      this.pretrazenaKvadratura = parseInt(localStorage.getItem("pretrazenaKvadratura"))
      this.pretrazenBrojSoba = parseInt(localStorage.getItem("pretrazenBrojSoba"))
      this.pretrazenGrad = localStorage.getItem("pretrazenGrad")
      this.pretrazenaOpstina = localStorage.getItem("pretrazenaOpstina")
      this.pretrazenaMikrolokacija = localStorage.getItem("pretrazenaMikrolokacija")
      this.trenutnaStranica = parseInt(localStorage.getItem("trenutnaStranica"))
      this.izvrsiPretragu()
    }
    else{
      document.querySelector('.mat-sidenav-content').scrollTop = 0;
    }
  }
  
  searchForm = this.formBuilder.group({
    tip: ['', Validators.required],
    cena: ['', Validators.pattern(/^\d*$/)],
    kvadratura: ['', Validators.pattern(/^\d*$/)],
    brojSoba: ['', []],
    lokacija: ['', []]
  })

  nekretnine : Nekretnina[] = []
  tipovi : Tip[] = []

  trenutnaStranica = 0
  ukupanBrojNekretnina = 0
  brojPoStranici = 10

  pretrazenTip = ""
  pretrazenaCena = 0
  pretrazenaKvadratura = 0
  pretrazenBrojSoba = 0
  pretrazenGrad = ""
  pretrazenaOpstina = ""
  pretrazenaMikrolokacija = ""

  detaljnije(n: Nekretnina){
    localStorage.setItem("trenutnaNekretnina", JSON.stringify(n))
    this.ruter.navigate(['realestateDetails'])
  }

  
  handlePageEvent(event: PageEvent) {
    document.querySelector('.mat-sidenav-content').scrollTop = 600;
    this.trenutnaStranica = event.pageIndex
    localStorage.setItem("trenutnaStranica", this.trenutnaStranica.toString())
    this.popuniNekretnine()
    return event
  }




  trazi(){
    if (this.searchForm.valid){
      
      this.trenutnaStranica = 0

      this.pretrazenTip = this.searchForm.controls["tip"].value

      this.pretrazenaCena = this.searchForm.controls["cena"].value == "" ? 1000000000 : this.searchForm.controls["cena"].value

      this.pretrazenaKvadratura = this.searchForm.controls["kvadratura"].value == "" ? 0 : this.searchForm.controls["kvadratura"].value

      this.pretrazenBrojSoba = this.searchForm.controls["brojSoba"].value == "" ? 0 : parseFloat(this.searchForm.controls["brojSoba"].value) 
      
      let lokacijaSplits = this.searchForm.controls["lokacija"].value.split("/")

      this.pretrazenGrad = ""
      this.pretrazenaOpstina = ""
      this.pretrazenaMikrolokacija = ""

      let pretrazeniGradovi = []
      lokacijaSplits[0].split(",").forEach(split => {
        pretrazeniGradovi.push(split.trim())
      });
      this.pretrazenGrad = pretrazeniGradovi.join("|")

      if (lokacijaSplits.length >= 2) {
        let pretrazeneOpstine = []
        lokacijaSplits[1].split(",").forEach(split => {
          pretrazeneOpstine.push(split.trim())
        });
        this.pretrazenaOpstina = pretrazeneOpstine.join("|")
      }
      if (lokacijaSplits.length >= 3) {
        let pretrazeneMikrolokacije = []
        lokacijaSplits[2].split(",").forEach(split => {
          pretrazeneMikrolokacije.push(split.trim())
        });
        this.pretrazenaMikrolokacija = pretrazeneMikrolokacije.join("|")
      }
      localStorage.setItem("pretraga", "pretraga")
      localStorage.setItem("pretrazenTip", this.pretrazenTip)
      localStorage.setItem("pretrazenaCena", this.pretrazenaCena.toString())
      localStorage.setItem("pretrazenaKvadratura", this.pretrazenaKvadratura.toString())
      localStorage.setItem("pretrazenBrojSoba", this.pretrazenBrojSoba.toString())
      localStorage.setItem("pretrazenGrad", this.pretrazenGrad)
      localStorage.setItem("pretrazenaOpstina", this.pretrazenaOpstina)
      localStorage.setItem("pretrazenaMikrolokacija", this.pretrazenaMikrolokacija)
      localStorage.setItem("trenutnaStranica", this.trenutnaStranica.toString())
      

      this.izvrsiPretragu()
    }
    

  }

  izvrsiPretragu(){
    this.servis.jednostavnaPretragaPrebroj(this.pretrazenTip, this.pretrazenGrad, this.pretrazenaOpstina, this.pretrazenaMikrolokacija, this.pretrazenaCena, this.pretrazenaKvadratura, this.pretrazenBrojSoba).subscribe((resp:number)=>{
      this.ukupanBrojNekretnina = resp
      console.log(resp)
    })


    this.popuniNekretnine()
    
    
  }


  brojSoba(br) : string{
    if (br == 6) return "5+"
    return br
  }

  nemaRezultata:boolean = false
  popuniNekretnine(){
    this.servis.jednostavnaPretraga(this.pretrazenTip, this.pretrazenGrad, this.pretrazenaOpstina, this.pretrazenaMikrolokacija, this.pretrazenaCena, this.pretrazenaKvadratura, this.pretrazenBrojSoba, this.trenutnaStranica * this.brojPoStranici, this.brojPoStranici).subscribe((n: Nekretnina[])=>{
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
      
      document.querySelector('.mat-sidenav-content').scrollTop = 600;
      
    })
  }


  /*scrollToTop(el) {
    el.scrollTop = 0;        
    const duration = 600;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }*/

}
