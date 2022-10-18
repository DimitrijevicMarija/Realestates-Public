import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private ruter: Router, private dataSharingService : DataSharingServiceService) {

    if (localStorage.getItem("ulogovan")!=null){
      this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    }
    this.dataSharingService.currentUser.subscribe( value => {
      this.ulogovan = value;
    });

   }

  ngOnInit(): void {
  }

  ulogovan: Korisnik = null

  pocetna(){
    this.ruter.navigate([''])
  }
  pretraga(){
    localStorage.removeItem("pretraga")
    this.ruter.navigate(['search'])
  }
  naprednaPretraga(){
    localStorage.removeItem("pretragaN")
    this.ruter.navigate(['advancedSearch'])
  }
  omiljene(){
    this.ruter.navigate(['favorites'])
  }

  mojeNekretnine(){
    this.ruter.navigate(['myRealestates'])
  }

  dodajNekretninu(){
    this.ruter.navigate(['addRealestate'])
  }

  json(){
    this.ruter.navigate(['addFromJSON'])
  }

  promeniLozinku(){
    this.ruter.navigate(['changePassword'])
  }

  promeniPodatke(){
    this.ruter.navigate(['changeData'])
  }

  odjaviSe(){
    localStorage.setItem("ulogovan", null)
    this.dataSharingService.currentUser.next(null)
    this.ruter.navigate(['/'])
  }

 
  korisnici(){
    this.ruter.navigate(['admin'])
  }

  dodajKorisnika(){
    this.ruter.navigate(['register'])
  }

  dodajAgenciju(){
    this.ruter.navigate(['addAgency'])
  }

  mikrolokacije(){
    this.ruter.navigate(['microlocations'])
  }

}


