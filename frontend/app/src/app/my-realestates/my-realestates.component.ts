import { Component, OnInit } from '@angular/core';
import { Nekretnina } from '../models/nekretnina';
import { RealestatesService } from '../realestates.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../services/users.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-realestates',
  templateUrl: './my-realestates.component.html',
  styleUrls: ['./my-realestates.component.css']
})
export class MyRealestatesComponent implements OnInit {
  constructor(private servis : RealestatesService, 
    private ruter: Router, private _snackBar: MatSnackBar, private korisnikServis: UsersService
    ,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan")) 
    if (this.ulogovan == null || (this.ulogovan.tip!="A" && this.ulogovan.tip!="S")){
      this.ruter.navigate([''])
    }
    
    this.servis.dohvatiNekretnineZaKorisnika(this.ulogovan.korisnickoIme).subscribe((n: Nekretnina[])=>{
      this.nekretnine = n
      this.nekretnine.forEach(n => {
        this.korisnikServis.dohvatiProfilnu(n.slike[0]).subscribe((data)=>{      
          let objectURL = URL.createObjectURL(data);       
          n.naslovnaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
        }, error => {
          console.log(error);
        });
        
      })
    })
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  nekretnine : Nekretnina[] = []
  ulogovan : Korisnik = null

  izmeni(n: Nekretnina){
    localStorage.setItem("nekretninaZaIzmenu", JSON.stringify(n))
    this.ruter.navigate(['editRealestate'])
  }

  prodato(n: Nekretnina){
    let mesec = new Date().getMonth()+ 1
    console.log("MESEC")
    console.log(mesec)

    this.servis.prodajNekretninu(n._id, mesec).subscribe((resp)=>{
      n.prodato = mesec
      this._snackBar.open("Nekretnina je prodata", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
    })
  }

}
