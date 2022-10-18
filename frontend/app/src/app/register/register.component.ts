import { Component, OnInit} from '@angular/core';
import {NgxCaptchaService} from  '@binssoft/ngx-captcha'
import { UsersService } from '../services/users.service';


import { DomSanitizer } from '@angular/platform-browser';
import { Agencija } from '../models/agencija';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Korisnik } from '../models/korisnik';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide1 = true;
  hide2 = true;


  registerForm = this.formBuilder.group({
      ime: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
      prezime: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
      korisnickoIme: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      lozinka: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.pattern(/^[a-zA-Z].*$/),(control) => this.validatePasswords(control, 'lozinka') ]],
      ponovljenaLozinka: ['', [Validators.required, (control) => this.validatePasswords(control, 'ponovljenaLozinka') ]],
      grad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
      datumRodjenja: ['', [Validators.required, (control) => this.above18(control)]],
      telefon :  ['', [Validators.required, Validators.pattern(/^\+3816[0-9]{7,8}$/)]],
      imejl: ['', [Validators.required, Validators.email]],
      tip: ['', [Validators.required]],
      agencija: ['', [(control) => this.agencyRequired(control)]],
      brojLicence: ['', [(control) => this.validateLicenceNumber(control)]],
      profilna: ['', [Validators.required]]
  })


  validatePasswords(control: AbstractControl, name: string) {
    if (this.registerForm === undefined || this.registerForm.get('lozinka').value === '' || this.registerForm.get('ponovljenaLozinka').value === '') {
      return null;
    } else if (this.registerForm.get('lozinka').value === this.registerForm.get('ponovljenaLozinka').value) {
      if (name === 'lozinka' && this.registerForm.get('ponovljenaLozinka').hasError('passwordMismatch')) {
        this.registerForm.get('lozinka').setErrors(null);
        this.registerForm.get('ponovljenaLozinka').updateValueAndValidity();
      } else if (name === 'ponovljenaLozinka' && this.registerForm.get('lozinka').hasError('passwordMismatch')) {
        this.registerForm.get('ponovljenaLozinka').setErrors(null);
        this.registerForm.get('lozinka').updateValueAndValidity();
      }
      return null;
    } else {
      return {'passwordMismatch': { value: 'The provided passwords do not match'}};
    }  
  }

  above18(control: AbstractControl) {
    if (this.registerForm === undefined || this.registerForm.get('datumRodjenja').value == "" ){
      return null;
    } 
    else {
      if (new Date().getTime() - this.registerForm.controls["datumRodjenja"].value.getTime() < 18*365*24*60*60*1000){
        return {
            'under18': {
              'message': "Nije punoletan",
            }  
        }
      }
      else return null;
    }
  }
  agencyRequired(control: AbstractControl) {
    if (this.registerForm === undefined || this.registerForm.controls["tip"].value != "A"){
      return null;
    } 
    if (this.registerForm.controls["brojLicence"].value == ""){
      return {
        'required': {
          'message': "Required for agents",
        }  
      }
    }
    return null
  }
  validateLicenceNumber(control: AbstractControl) {
    if (this.registerForm === undefined || this.registerForm.controls["tip"].value != "A"){
      return null;
    } 
    if (this.registerForm.controls["brojLicence"].value == ""){
      return {
        'required': {
          'message': "Required for agents",
        }  
      }
    }
    if (!(/^[0-9a-zA-Z]+$/.test(this.registerForm.controls["brojLicence"].value))){
      return {
        'pattern': {
          'message': "Bad format",
        }  
      }
    }
    return null
  }


  captchaStatus:any = null;
  captchaConfig:any = {
    length: 6,
    type: 1, //2 je sabiranje
    cssClass:'custom',
    back: {
      stroke:"#1F7EC7", //tu boju linijica promenis
      solid:"#f2efd2" //boja pozadine
    } ,
    font:{
      color:"#000000",
      size:"35px"
    }
  };
  constructor(private captchaService:NgxCaptchaService, private servis: UsersService,
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private ruter: Router) { 

    this.captchaService.captchStatus.subscribe((status)=>{
      this.captchaStatus= status;
      if (status == false) {
        this.robotGreska = "Niste uneli ispravno kombinaciju"
        this.robotProsao = false;
      } else  if (status == true) {
       this.robotProsao = true
       this.robotGreska = ""
       this._snackBar.open("Uspesno uneta kombinacija", "Zatvori", {
        duration: 2000,
        panelClass: ['my-snackbar']
      });
      }
    });
  }

  adminUlogovan: boolean = false
  
  ngOnInit(): void {
    
    this.servis.dohvatiAgencije().subscribe((a: Agencija[])=>{
      this.agencije = a
    })
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan!=null){
      if (ulogovan.tip == "ADMIN"){
        this.adminUlogovan = true
      }
    }
    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  imageUrl

  agencije : Agencija[] = []

  robotProsao : boolean = false
  robotGreska : string
  greska : string
  slikaGreska : string

  registrujSe(){
    if (this.registerForm.valid && this.chosen){
      if (!this.robotProsao && !this.adminUlogovan){
        this.robotGreska = "Otkucajte kod iznad"
      }
      else {
        this.upisiUBazuNovogKorisnika();
      }
    }
  }

  image : File
  chosen : boolean = false


  fileChosen(event: any){
    if (event.target.value){
      this.image = <File> event.target.files[0]

      if (/^.*\.jpg$/.test(this.image.name) || /^.*\.png$/.test(this.image.name)){
        this.slikaGreska = ""
      }
      else {
        this.slikaGreska = "Slika mora biti u JPG/PNG formatu"
        this.chosen = false
        return
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        var img = new Image();
        img.onload = () => {
          if (img.width < 100 || img.width > 300 || img.height < 100 || img.height > 300){
            this.slikaGreska = "Sirina i visina slike moraju biti izmedju 100 i 300px"
            this.chosen = false
          }
          else {
            this.slikaGreska = ""
            this.chosen = true
          }
         
        };
        img.src  = e.target.result.toString();
      };

    }
    else{
      this.chosen = false;
      //this.slikaGreska = "Profilna slika je obavezno polje"
      this.image = null
    }
    
  }



  upisiUBazuNovogKorisnika(){

    //dodati iznad da prikazuje ako je uspesno uneta kombinacija za robota
    let agencija = this.registerForm.controls["agencija"].value
    let brojLicence = this.registerForm.controls["brojLicence"].value
    
    if (this.registerForm.controls["tip"].value != "A"){
      agencija = ""
      brojLicence = ""
    }
    let datumStr = this.registerForm.controls["datumRodjenja"].value.getFullYear() + "-" + (this.registerForm.controls["datumRodjenja"].value.getMonth()+ 1) + "-" + this.registerForm.controls["datumRodjenja"].value.getDate()

    let fd = new FormData()
    if(this.image){
       
        fd.append('ime', this.registerForm.controls["ime"].value)
        fd.append('prezime', this.registerForm.controls["prezime"].value)
        fd.append('korisnickoIme', this.registerForm.controls["korisnickoIme"].value)
        fd.append('lozinka', this.registerForm.controls["lozinka"].value)
        fd.append('telefon', this.registerForm.controls["telefon"].value)
        fd.append('grad', this.registerForm.controls["grad"].value)
        fd.append('datumRodjenja', datumStr)
        fd.append('imejl', this.registerForm.controls["imejl"].value)
        fd.append('agencija', agencija)
        fd.append('licenca', brojLicence)
        fd.append('tip', this.registerForm.controls["tip"].value)

        let odobren = "?"
        if (this.adminUlogovan) odobren = "DA"

        fd.append('odobren', odobren) //mora kao string da se doda
        
        fd.append('profilna', this.image, this.image.name) // , this.image.name

        this.servis.registrujKorisnika(fd)
          .subscribe((resp)=>{

            if (resp["poruka"]){
              this.greska=""
              this._snackBar.open("Uspesno registrovanje", "Zatvori", {
                duration: 2000,
                panelClass: ['my-snackbar']
              });
              if (this.adminUlogovan) this.ruter.navigate(['admin'])
              else this.ruter.navigate([''])
            }
            else {
              if (resp["imejlGreska"] != "") this.greska = resp["imejlGreska"]
              if (resp["korisnickoImeGreska"] != "") this.greska = resp["korisnickoImeGreska"]
              
            }
          
          })
    }

   
  }



  

}



