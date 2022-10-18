import { Component, OnInit } from '@angular/core';
import { Nekretnina } from '../models/nekretnina';
import { RealestatesService } from '../realestates.service';
import { UsersService } from '../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private servis : RealestatesService, private korisnikServiis : UsersService,
    private sanitizer: DomSanitizer, private ruter: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    if (this.ulogovan == null || this.ulogovan.tip!="K" ){
      this.ruter.navigate([''])
    }

    this.ulogovan.omiljene.forEach(id =>{
      this.servis.dohvatiNekretninu(id).subscribe((nekretnina: Nekretnina)=>{
        this.nekretnine.push(nekretnina)
        this.korisnikServiis.dohvatiProfilnu(nekretnina.slike[0]).subscribe((data)=>{      
          let objectURL = URL.createObjectURL(data);       
          nekretnina.naslovnaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
        }, error => {
          console.log(error);
        });
        
        this.servis.prosecnaCena(nekretnina.tip, nekretnina.mikrolokacija).subscribe((resp)=>{
          nekretnina.prosecnaCena = resp[0]["average"].toFixed(2);
        });
      
      
      })
    })
    document.querySelector('.mat-sidenav-content').scrollTop = 0;

  }


  nekretnine : Nekretnina[] = []
  ulogovan : Korisnik = null

  detaljnije(n: Nekretnina){
    localStorage.setItem("trenutnaNekretnina", JSON.stringify(n))
    this.ruter.navigate(['realestateDetails'])
  }

  
  brojSoba(br) : string{
    if (br == 6) return "5+"
    return br
  }

  ukloniIzOmiljenih(id){
    this.ulogovan.omiljene = this.ulogovan.omiljene.filter(n => {
      return n != id
    })
    this.nekretnine = this.nekretnine.filter(n => {
      return n._id != id
    })
    localStorage.setItem("ulogovan", JSON.stringify(this.ulogovan))
    
    this.korisnikServiis.ukloniIzOmiljenih(this.ulogovan.korisnickoIme, id).subscribe((resp)=>{
      this._snackBar.open("Uklonjeno iz omiljenih", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
    })
  }

}
