import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogDelete } from '../admin/admin.component';
import { Agencija } from '../models/agencija';
import { Korisnik } from '../models/korisnik';
import { Mikrolokacija } from '../models/mikrolokacija';
import { RealestatesService } from '../realestates.service';

@Component({
  selector: 'app-microlocations',
  templateUrl: './microlocations.component.html',
  styleUrls: ['./microlocations.component.css']
})
export class MicrolocationsComponent implements OnInit {

  constructor(private servis: RealestatesService, private ruter: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  mikrolokacije : Mikrolokacija[] = []

  ngOnInit(): void {
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="ADMIN"){
      this.ruter.navigate([''])
    }
    
    this.servis.dohvatiMikrolokacije().subscribe((m : Mikrolokacija[])=>{
      this.mikrolokacije = m;
      this.mikrolokacije.forEach(m => {m.postojiNekretnina = true})
      this.mikrolokacije.forEach(m => {
        this.servis.postojiLiNekretninaNaMikrolokaciji(m.naziv, m.opstina, m.grad).subscribe((n)=>{
          if (n["n"] == null) m.postojiNekretnina = false
          else m.postojiNekretnina = true
        })
      })
    })

    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  dodajMikrolokaciju(){
    localStorage.setItem("dodavanje", "DA")
    this.ruter.navigate(['addMicrolocation'])
  }
  obrisiMikrolokaciju(id){
    const dialogRef = this.dialog.open(DialogDelete);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == true){
        this.mikrolokacije = this.mikrolokacije.filter(m => {
          return m._id != id
        })
        this.servis.obrisiMikrolokaciju(id).subscribe(resp =>{
          
          this._snackBar.open("Mikrolokacija je obrisana", "Zatvori", {
            duration: 2000,
            panelClass: ['my-snackbar']
          });
          
        })
      }
    });
     
  }

}
