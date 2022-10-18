import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { RealestatesService } from '../realestates.service';
import { Opstina } from '../models/opstina';
import { Grad } from '../models/grad';
import { Mikrolokacija } from '../models/mikrolokacija';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-microlocation',
  templateUrl: './add-microlocation.component.html',
  styleUrls: ['./add-microlocation.component.css']
})
export class AddMicrolocationComponent implements OnInit {

  constructor(private servis: RealestatesService, private formBuilder: FormBuilder,
    private ruter: Router, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
      let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
      if (ulogovan == null || ulogovan.tip!="ADMIN"){
        this.ruter.navigate([''])
      }
      
      this.servis.dohvatiGradove().subscribe((g: Grad[])=>{
          this.gradovi = g;
      })
      this.servis.dohvatiOpstine().subscribe((o: Opstina[])=>{
        this.sveOpstine = o;
        this.opstine = o;
      })
      document.querySelector('.mat-sidenav-content').scrollTop = 0;
    }
  
  
    addMicrolocationForm = this.formBuilder.group({
        naziv: ['', Validators.required],
        grad: ['', [Validators.required]],
        opstina: ['', Validators.required],
        ulice: ['', Validators.required]
    })
  
    
    gradovi : Grad[] = []
    sveOpstine : Opstina[] = [] //to su sve, da ne bismo dovlacili vise puta
    opstine : Opstina[] = [] // to su one koje se prikazuju
   
  
  
    promenjenGrad(event){
      let grad = this.addMicrolocationForm.controls["grad"].value
      if (grad == "") this.opstine = this.sveOpstine
      else {
        this.opstine = this.sveOpstine.filter((o) => {
          return o.grad == grad
        })
        this.addMicrolocationForm.controls["opstina"].setValue("")
        
      }
    }

    dodajMikrolokaciju(){
      if (this.addMicrolocationForm.valid){
          let ulice = []
          this.addMicrolocationForm.controls["ulice"].value.split(",").forEach(split => {
            ulice.push(split.trim())
          });
          this.servis.dodajMikrolokaciju(this.addMicrolocationForm.controls["naziv"].value, this.addMicrolocationForm.controls["grad"].value, this.addMicrolocationForm.controls["opstina"].value, ulice).subscribe((resp)=>{
            this._snackBar.open("Mikrolokacija je uspesno dodata", "Zatvori", {
              duration: 2000,
              panelClass: ['my-snackbar']
            });
            this.ruter.navigate(['microlocations'])
          })
      }
    }

}
