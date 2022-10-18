import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

 
  registrujKorisnika(data: any){
    return this.http.post(`${this.uri}/korisnici/registruj`, data)
  }

  ulogujKorisnika(korisnickoIme: string, lozinka: string){
    const data = {
      korisnickoIme : korisnickoIme,
      lozinka : lozinka
    }
    return this.http.post(`${this.uri}/korisnici/uloguj`, data)
  }

  promeniLozinku(korisnickoIme: string, lozinka: string){
    const data = {
      korisnickoIme : korisnickoIme,
      lozinka : lozinka
    }
    return this.http.post(`${this.uri}/korisnici/promeniLozinku`, data)
  }

  dohvatiProfilnu(profilna){  //koristicu isti taj i za  dohvatanje slike od nekretnina
    const data = {
      profilna : profilna
    }
    return this.http.post(`${this.uri}/korisnici/profilna`, data, {responseType:'blob'})
  }


  dohvatiKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiKorisnike`)
  }

  potvrdiOdbijKorisnika(korisnickoIme, odobren){
    const data = {
      korisnickoIme : korisnickoIme,
      odobren : odobren
    }
    return this.http.post(`${this.uri}/korisnici/potvrdiOdbijKorisnika`, data)
  }

  obrisiKorisnika(korisnickoIme){
    const data = {
      korisnickoIme : korisnickoIme
    }
    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`, data)
  }

  dodajAgenciju(ime, pib, grad, adresa, telefon){
    const data = {
      ime : ime,
      pib: pib,
      grad : grad,
      adresa : adresa, 
      telefon : telefon
    }
    return this.http.post(`${this.uri}/korisnici/dodajAgenciju`, data)
  }

  dohvatiAgencije(){
    return this.http.get(`${this.uri}/korisnici/dohvatiAgencije`)
  }

  izmeniKorisnika(data: any){
    console.log(data)
    return this.http.post(`${this.uri}/korisnici/izmeni`, data)
  }
  izmeniProfilnu(data: any){
    console.log(data)
    return this.http.post(`${this.uri}/korisnici/izmeniProfilnu`, data)
  }

  dohvatiKorisnika(kor_ime){
    
    const data = {
       kor_ime : kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, data)
  }
  dohvatiAgenciju(pib){
    const data = {
      pib : pib
   }
   return this.http.post(`${this.uri}/korisnici/dohvatiAgenciju`, data)
  }

  dodajUOmiljenje(korisnickoIme, idN){
    const data = {
      korisnickoIme : korisnickoIme,
      idN : idN
   }
   return this.http.post(`${this.uri}/korisnici/dodajUOmiljene`, data)
  }

  ukloniIzOmiljenih(korisnickoIme, idN){
    const data = {
      korisnickoIme : korisnickoIme,
      idN : idN
   }
   return this.http.post(`${this.uri}/korisnici/ukloniIzOmiljenih`, data)
  }

  promeniPodatkeZaProdavca(korisnickoIme, agencija, telefon, imejl, tip, licenca){
    const data = {
      korisnickoIme : korisnickoIme,
      agencija : agencija,
      telefon: telefon,
      imejl: imejl,
      tip: tip,
      licenca: licenca
    }
    console.log(data)
    return this.http.post(`${this.uri}/korisnici/promeniPodatkeZaProdavca`, data)
  }

}
