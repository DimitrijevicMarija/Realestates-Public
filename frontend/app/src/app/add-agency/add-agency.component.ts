import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Agencija } from '../models/agencija';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private servis : UsersService, private formBuilder: FormBuilder, private ruter: Router, private _snackBar: MatSnackBar) { }

  addAgencyForm = this.formBuilder.group({
    ime: ['', [Validators.required]],
    pib: ['', [Validators.required]],
    grad: ['', [Validators.required]],
    adresa: ['', [Validators.required]],
    telefon :  ['', [Validators.required, Validators.pattern(/^\+3816[0-9]{7,8}$/)]]
  })

  ngOnInit(): void {
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="ADMIN"){
      this.ruter.navigate([''])
    }

    this.servis.dohvatiAgencije().subscribe((a: Agencija[])=>{
      this.agencije = a
    })
  }

  agencije : Agencija[] = []
  greska = ""

  dodajAgenciju(){
    if (this.addAgencyForm.valid){

      if (this.agencije.find(a => a.pib == this.addAgencyForm.controls["pib"].value) == null){
        this.servis.dodajAgenciju(this.addAgencyForm.controls["ime"].value, this.addAgencyForm.controls["pib"].value, this.addAgencyForm.controls["grad"].value, this.addAgencyForm.controls["adresa"].value, this.addAgencyForm.controls["telefon"].value)
        .subscribe((resp)=>{
  
          if (resp["poruka"]){
            this._snackBar.open("Agencija je uspesno dodata", "Zatvori", {
              duration: 2000,
              panelClass: ['my-snackbar']
            });
          } 
          this.greska = ""
          
        })
      }
      else{
        this.greska = "PIB mora biti jedinstven!"
      }

      
    }
    
  }

}
