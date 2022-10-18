import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Agencija } from '../models/agencija';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm = this.formBuilder.group({
    ime: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
    prezime: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
    grad: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]],
    datumRodjenja: ['', [Validators.required]],
    telefon :  ['', [Validators.required, Validators.pattern(/^\+3816[0-9]{7,8}$/)]],
    tip: ['', [Validators.required]],
    agencija: ['', [(control) => this.agencyRequired(control)]],
    brojLicence: ['', [(control) => this.validateLicenceNumber(control)]],
    profilna: ['', []]
  })
  
  agencyRequired(control: AbstractControl) {
    if (this.editForm === undefined || this.editForm.controls["tip"].value != "A"){
      return null;
    } 
    if (this.editForm.controls["brojLicence"].value == ""){
      return {
        'required': {
          'message': "Required for agents",
        }  
      }
    }
    return null
  }
  validateLicenceNumber(control: AbstractControl) {
    if (this.editForm === undefined || this.editForm.controls["tip"].value != "A"){
      return null;
    } 
    if (this.editForm.controls["brojLicence"].value == ""){
      return {
        'required': {
          'message': "Required for agents",
        }  
      }
    }
    if (!(/^[0-9a-zA-Z]+$/.test(this.editForm.controls["brojLicence"].value))){
      return {
        'pattern': {
          'message': "Bad format",
        }  
      }
    }
    return null
  }


  constructor(private servis: UsersService,  private sanitizer: DomSanitizer,
    private ruter: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let ulogovan : Korisnik = JSON.parse(localStorage.getItem("ulogovan"))
    if (ulogovan == null || ulogovan.tip!="ADMIN"){
      this.ruter.navigate([''])
    }

    this.servis.dohvatiAgencije().subscribe((a: Agencija[])=>{
      this.agencije = a
    })
    this.korisnikIzmena = JSON.parse(localStorage.getItem("korisnikIzmena"))
    if (this.korisnikIzmena == null){
      this.ruter.navigate([''])
    }
    
    this.editForm.controls["ime"].setValue(this.korisnikIzmena.ime)
    this.editForm.controls["prezime"].setValue(this.korisnikIzmena.prezime)
    this.editForm.controls["grad"].setValue(this.korisnikIzmena.grad)
    this.editForm.controls["telefon"].setValue(this.korisnikIzmena.telefon)
    this.editForm.controls["tip"].setValue(this.korisnikIzmena.tip)
    this.editForm.controls["agencija"].setValue(this.korisnikIzmena.agencija)
    this.editForm.controls["brojLicence"].setValue(this.korisnikIzmena.licenca)

    let splits = this.korisnikIzmena.datumRodjenja.split("-")
    console.log(parseInt(splits[0]))
    console.log(parseInt(splits[1]))
    console.log(parseInt(splits[2]))
    this.editForm.controls["datumRodjenja"].setValue(
      new Date(parseInt(splits[0]), parseInt(splits[1]) - 1, parseInt(splits[2])))



    this.servis.dohvatiProfilnu(this.korisnikIzmena.profilna).subscribe((data)=>{      
      let objectURL = URL.createObjectURL(data);       
      this.korisnikIzmena.urlProfilna = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
      console.log(error);
    });

    document.querySelector('.mat-sidenav-content').scrollTop = 0;
  }

  korisnikIzmena : Korisnik
  agencije : Agencija[]

  izmeni(){
    if (this.editForm.valid){
      let datumStr = this.editForm.controls["datumRodjenja"].value.getFullYear() + "-" + (this.editForm.controls["datumRodjenja"].value.getMonth()+ 1) + "-" + this.editForm.controls["datumRodjenja"].value.getDate()

      const data = {
        'ime': this.editForm.controls["ime"].value,
        'prezime': this.editForm.controls["prezime"].value,
        'korisnickoIme': this.korisnikIzmena.korisnickoIme,
        'grad': this.editForm.controls["grad"].value,
        'telefon': this.editForm.controls["telefon"].value,
        'datumRodjenja': datumStr,
        'agencija': this.editForm.controls["agencija"].value,
        'licenca': this.editForm.controls["brojLicence"].value,
        'tip': this.editForm.controls["tip"].value
      }
      
      this.servis.izmeniKorisnika(data)
        .subscribe((resp)=>{
          if (resp["poruka"]){
            
           
    
          if(this.image){
            let fd = new FormData()
            fd.append('korisnickoIme', this.korisnikIzmena.korisnickoIme)
            fd.append('profilna', this.image)
            this.servis.izmeniProfilnu(fd)
            .subscribe((resp)=>{
              if (resp["poruka"]){

              }
            })
          }
          this._snackBar.open("Uspesno izmenjen korisnik", "Zatvori", {
            duration: 2000,
            panelClass: ['my-snackbar']
          });
          this.ruter.navigate(['admin'])
          }
        })
    }
  }

  image : File

  //nema provera nikakvih
  fileChosen(event: any){
    if (event.target.value){
      this.image = <File> event.target.files[0]
      let objectURL = URL.createObjectURL(event.target.files[0]);       
      this.korisnikIzmena.urlProfilna = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }    
  }



}
