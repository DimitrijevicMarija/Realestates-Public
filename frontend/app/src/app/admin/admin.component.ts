import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  brojNeodobrenihKorisnika = 0

  constructor(private servis: UsersService,  private sanitizer: DomSanitizer,
    private ruter: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

 
  korisnici : Korisnik[] = []
  ngOnInit(): void {
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="ADMIN"){
      this.ruter.navigate([''])
    }
    this.servis.dohvatiKorisnike().subscribe((k : Korisnik[])=>{
      this.korisnici = k;
      this.korisnici = this.korisnici.filter((k)=>{
        return k.tip != "ADMIN"
      })
      this.korisnici.forEach(k => {
        if (k.odobren == "?") this.brojNeodobrenihKorisnika++;
        this.servis.dohvatiProfilnu(k.profilna).subscribe((data)=>{      
          let objectURL = URL.createObjectURL(data);       
          k.urlProfilna = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
        }, error => {
          console.log(error);
        });
      })
     
    })
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

 

  potvrdiKorisnika(korisnik: Korisnik){   
    this.servis.potvrdiOdbijKorisnika(korisnik.korisnickoIme, "DA").subscribe((resp)=>{
      korisnik.odobren = "DA"
      this.brojNeodobrenihKorisnika--
      this._snackBar.open("Korisnik je odobren", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
    })
  }
  odbijKorisnika(korisnik: Korisnik){
    this.servis.potvrdiOdbijKorisnika(korisnik.korisnickoIme, "NE").subscribe((resp)=>{
      korisnik.odobren = "NE"
      this.brojNeodobrenihKorisnika--
      this._snackBar.open("Korisnik je odbijen", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
    })
  }
  obrisiKorisnika(korisnik: Korisnik){
    const dialogRef = this.dialog.open(DialogDelete);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true){
        this.servis.obrisiKorisnika(korisnik.korisnickoIme).subscribe((resp)=>{
          this._snackBar.open("Korisnik je obrisan", "Zatvori", {
            duration: 2000,
            panelClass: ['my-snackbar']
          });
          this.korisnici = this.korisnici.filter((k)=>{
            return k.korisnickoIme != korisnik.korisnickoIme
          })
        })
      }
    });
   
  }

  izmeniKorisnika(korisnik: Korisnik){

    korisnik.urlProfilna = null
    localStorage.setItem("korisnikIzmena", JSON.stringify(korisnik))
    this.ruter.navigate(['editUser'])
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogDelete {}
