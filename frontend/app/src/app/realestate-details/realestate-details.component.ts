import { Component, OnInit } from '@angular/core';
import { Nekretnina } from '../models/nekretnina';
import { UsersService } from '../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Korisnik } from '../models/korisnik';
import { Agencija } from '../models/agencija';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-realestate-details',
  templateUrl: './realestate-details.component.html',
  styleUrls: ['./realestate-details.component.css']
})
export class RealestateDetailsComponent implements OnInit {

  constructor(private korisnikServis: UsersService, private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar) {

      this.n = JSON.parse(localStorage.getItem("trenutnaNekretnina"))
      this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
  }

  ngOnInit(): void {
    this.n.slike.forEach(s => {
      this.korisnikServis.dohvatiProfilnu(s).subscribe((data)=>{      
        let objectURL = URL.createObjectURL(data);       
        this.slike.push(this.sanitizer.bypassSecurityTrustUrl(objectURL));
        
      }, error => {
        console.log(error);
      });
    })
    
    this.korisnikServis.dohvatiKorisnika(this.n.oglasivac).subscribe((o: Korisnik)=>{
      this.oglasivac = o
     
    })
    if (this.n.agencija != ""){
      this.korisnikServis.dohvatiAgenciju(this.n.agencija).subscribe((a: Agencija)=>{
        this.agencija = a
        
    })
    }
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  n : Nekretnina
  slike = []

  oglasivac : Korisnik = null
  agencija : Agencija = null
  ulogovan : Korisnik = null

  prikaziKontaktAgencije : boolean = false
  prikaziKontaktA(){
    this.prikaziKontaktAgencije = !this.prikaziKontaktAgencije
  }

  prikaziKontaktOglasivaca : boolean = false
  prikaziKontaktO(){
    this.prikaziKontaktOglasivaca = !this.prikaziKontaktOglasivaca
  }


  dodajUOmiljene(){
    if (this.ulogovan.omiljene.length == 5){
      this._snackBar.open("Ne mozete imati vise od 5 omiljenih nekretnina", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      }); 
      return
    }
    this.ulogovan.omiljene.push(this.n._id)
    localStorage.setItem("ulogovan", JSON.stringify(this.ulogovan))
    this.korisnikServis.dodajUOmiljenje(this.ulogovan.korisnickoIme, this.n._id).subscribe((resp)=>{
      this._snackBar.open("Dodato u omiljene", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      }); 
      // alert("Dodato u omiljene")
    })
  }
}
