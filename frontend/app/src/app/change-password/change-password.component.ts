import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { Korisnik } from '../models/korisnik';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private servis: UsersService, private ruter: Router, private formBuilder: FormBuilder, private dataSharingService : DataSharingServiceService,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (this.korisnik == null ){
      this.ruter.navigate([''])
    }
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  changePassForm = this.formBuilder.group({
    staraLozinka: ['', [Validators.required, (control) => this.validateOldPassword(control)]],
    lozinka: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.pattern(/^[a-zA-Z].*$/),(control) => this.validatePasswords(control, 'lozinka') ]],
    ponovljenaLozinka: ['', [Validators.required, (control) => this.validatePasswords(control, 'ponovljenaLozinka') ]]
  })

  validatePasswords(control: AbstractControl, name: string) {
    if (this.changePassForm === undefined || this.changePassForm.get('lozinka').value === '' || this.changePassForm.get('ponovljenaLozinka').value === '') {
      return null;
    } else if (this.changePassForm.get('lozinka').value === this.changePassForm.get('ponovljenaLozinka').value) {
      if (name === 'lozinka' && this.changePassForm.get('ponovljenaLozinka').hasError('passwordMismatch')) {
        this.changePassForm.get('lozinka').setErrors(null);
        this.changePassForm.get('ponovljenaLozinka').updateValueAndValidity();
      } else if (name === 'ponovljenaLozinka' && this.changePassForm.get('lozinka').hasError('passwordMismatch')) {
        this.changePassForm.get('ponovljenaLozinka').setErrors(null);
        this.changePassForm.get('lozinka').updateValueAndValidity();
      }
      return null;
    } else {
      return {'passwordMismatch': { value: 'The provided passwords do not match'}};
    }  
  }
  validateOldPassword(control: AbstractControl) {
    if (this.changePassForm === undefined){
      return null;
    } 
    if (this.changePassForm.controls["staraLozinka"].value != this.korisnik.lozinka){
      return {
        'notGoodOld': {
          'message': "Not good old password",
        }  
      }
    }
    return null
  }

  hide = true;
  hide1 = true;
  hide2 = true;


  korisnik: Korisnik

  promeniLozinku(){

    if (this.changePassForm.valid){
      if (this.changePassForm.controls["lozinka"].value != this.changePassForm.controls["staraLozinka"].value){
        this.servis.promeniLozinku(this.korisnik.korisnickoIme, this.changePassForm.controls["lozinka"].value).subscribe((data)=>{
          localStorage.setItem("ulogovan", null);
          this.dataSharingService.currentUser.next(null);
          this._snackBar.open("Uspesno izmenjena lozinka", "Zatvori", {
            duration: 2000,
            panelClass: ['my-snackbar']
          });
          this.ruter.navigate([''])
        })
      }
      else {
        //dzabe da ne saljemo upit ka bazi ako je isto
        localStorage.setItem("ulogovan", null);
        this.dataSharingService.currentUser.next(null);
        this._snackBar.open("Uspesno izmenjena lozinka", "Zatvori", {
          duration: 2000,
          panelClass: ['my-snackbar']
        });
        this.ruter.navigate([''])
      }
    }
   

  }


}
