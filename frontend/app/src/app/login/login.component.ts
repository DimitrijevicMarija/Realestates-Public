import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import {FormControl, Validators, NgForm, FormBuilder, FormGroup} from '@angular/forms';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { Korisnik } from '../models/korisnik';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  constructor(private servis: UsersService, private ruter : Router, private formBuilder:        FormBuilder, private dataSharingService : DataSharingServiceService) { 
    if (localStorage.getItem("ulogovan")!=null){
      this.ulogovanKorisnik = JSON.parse(localStorage.getItem("ulogovan"))
    }
    this.dataSharingService.currentUser.subscribe( value => {
      this.ulogovanKorisnik = value;
    });
  }

  loginForm = this.formBuilder.group({
    korisnickoIme: ['', Validators.required],
    lozinka: ['', Validators.required]
  })

  ngOnInit(): void {
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  

  hide = true;
  greska : string = ""
  ulogovanKorisnik : Korisnik = null

  ulogujSe(){

    if (this.loginForm.valid){
      this.servis.ulogujKorisnika(this.loginForm.controls["korisnickoIme"].value, this.loginForm.controls["lozinka"].value).subscribe(resp =>{

        this.greska = resp["poruka"]
        
        if (resp["korisnik"]){
          let ulogovan = resp["korisnik"]
          localStorage.setItem("ulogovan", JSON.stringify(ulogovan))
          if (ulogovan["odobren"] == "DA"){
            if (ulogovan["tip"]=="ADMIN"){
              this.dataSharingService.currentUser.next(ulogovan);
              this.ruter.navigate(['admin'])
            }
            else if (ulogovan["tip"]=="K"){
              this.dataSharingService.currentUser.next(ulogovan);
              localStorage.removeItem("pretraga")
              this.ruter.navigate(['search'])
            }
            else {
              this.dataSharingService.currentUser.next(ulogovan);
              this.ruter.navigate(['myRealestates'])
            }  
          }
          else{
            this.greska = "Korisnik nije odobren od strane admina"
          }

          
        }
  
      })
    }
  }

}
