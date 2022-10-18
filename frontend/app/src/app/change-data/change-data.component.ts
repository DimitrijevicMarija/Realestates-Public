import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.css']
})
export class ChangeDataComponent implements OnInit {

  constructor(private servis: UsersService, private formBuilder: FormBuilder, private ruter: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
    if (this.ulogovan == null || (this.ulogovan.tip!="A" && this.ulogovan.tip!="S")){
      this.ruter.navigate([''])
    }

    this.changeForm.controls["telefon"].setValue(this.ulogovan.telefon)
    this.changeForm.controls["imejl"].setValue(this.ulogovan.imejl)
    this.changeForm.controls["agencija"].setValue(this.ulogovan.agencija)
    this.changeForm.controls["brojLicence"].setValue(this.ulogovan.licenca)


    this.servis.dohvatiAgencije().subscribe((a: Agencija[])=>{
      this.agencije = a
    })
  }

  ulogovan: Korisnik = null
  agencije : Agencija[] = []

  changeForm = this.formBuilder.group({
    telefon :  ['', [Validators.required, Validators.pattern(/^\+3816[0-9]{7,8}$/)]],
    imejl: ['', [Validators.required, Validators.email]],
    agencija: ['', []],
    brojLicence: ['', []]
  })

  izmeni(){
    if (this.changeForm.valid){
      let tip = this.changeForm.controls["agencija"].value != "" ? "A" : "S"
      let agencija = this.changeForm.controls["agencija"].value
      let licenca = this.changeForm.controls["brojLicence"].value
      let imejl = this.changeForm.controls["imejl"].value
      let telefon = this.changeForm.controls["telefon"].value

      this.servis.promeniPodatkeZaProdavca(this.ulogovan.korisnickoIme, agencija, telefon, imejl, tip, licenca).subscribe((resp)=>{
        this.ulogovan.imejl = imejl
        this.ulogovan.agencija = agencija
        this.ulogovan.tip = tip
        this.ulogovan.telefon = telefon
        this.ulogovan.licenca = licenca
        localStorage.setItem("ulogovan", JSON.stringify(this.ulogovan))
        this._snackBar.open("Podaci su izmenjeni", "Zatvori", {
          duration: 2000,
          panelClass: ['my-snackbar']
        });
      })
    }
  }
}
