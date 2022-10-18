import { isDataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealestatesService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000';

  dohvatiTipoveNekretnina(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiTipove`)
  }
  dohvatiGradove(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiGradove`)
  }
  dohvatiOpstine(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiOpstine`)
  }
  dohvatiMikrolokacije(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiMikrolokacije`)
  }
  dohvatiLinije(){
    return this.http.get(`${this.uri}/nekretnine/dohvatiLinije`)
  }

  dodajNekretninu(data){
    console.log(data)
    return this.http.post(`${this.uri}/nekretnine/dodajNekretninu`, data)
  }

  izmeniNekretninu(data){
    return this.http.post(`${this.uri}/nekretnine/izmeniNekretninu`, data)
  }

  dohvatiNekretnine(skip, limit){
    const data = {
      limit : limit,
      skip: skip
    }
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretnine`, data)
  }

  dohvatiNekretninu(id){
    const data = {
        id : id
    }
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretninu`, data)
  }

  jednostavnaPretraga(tip, grad, opstina, mikrolokacija, cena, kvadratura, brojSoba, skip, limit){
    const data = {
      tip: tip,
      cena: cena,
      grad: grad,
      opstina: opstina,
      mikrolokacija: mikrolokacija,
      kvadratura : kvadratura,
      brojSoba : brojSoba,
      skip: skip,
      limit: limit
    }
    
    return this.http.post(`${this.uri}/nekretnine/jednostavnaPretaraga`, data)
  }

  jednostavnaPretragaPrebroj(tip, grad, opstina, mikrolokacija, cena, kvadratura, brojSoba){
    const data = {
      tip: tip,
      cena: cena,
      grad: grad,
      opstina: opstina,
      mikrolokacija: mikrolokacija,
      kvadratura : kvadratura,
      brojSoba : brojSoba
    }
    
    return this.http.post(`${this.uri}/nekretnine/jednostavnaPretragaPrebroj`, data)
  }

  prosecnaCena(tip, mikrolokacija){
    const data = {
      tip: tip,
      mikrolokacija: mikrolokacija
    }
    
    return this.http.post(`${this.uri}/nekretnine/prosecnaCena`, data)
  }



  slozenaPretraga(cenaOd, cenaDo, kvadraturaOd, kvadraturaDo, brojSobaOd, brojSobaDo, godinaIzgradnjeOd, godinaIzgradnjeDo, spratOd, spratDo, mesecneRezijeOd, mesecneRezijeDo, 
    stanje, grejanje, agencija, skip, limit ){
    const data = {
      cenaOd : cenaOd,
      cenaDo: cenaDo,
      kvadraturaOd : kvadraturaOd,
      kvadraturaDo : kvadraturaDo,
      brojSobaOd: brojSobaOd,
      brojSobaDo: brojSobaDo,
      godinaIzgradnjeOd: godinaIzgradnjeOd,
      godinaIzgradnjeDo: godinaIzgradnjeDo,
      spratOd: spratOd,
      spratDo: spratDo,
      mesecneRezijeOd: mesecneRezijeOd,
      mesecneRezijeDo: mesecneRezijeDo,
      stanje: stanje,
      grejanje: grejanje,
      agencija: agencija,
      skip: skip,
      limit: limit
    }

   return this.http.post(`${this.uri}/nekretnine/slozenaPretraga`, data)
  }

  slozenaPretragaPrebroj(cenaOd, cenaDo, kvadraturaOd, kvadraturaDo, brojSobaOd, brojSobaDo, godinaIzgradnjeOd, godinaIzgradnjeDo, spratOd, spratDo, mesecneRezijeOd, mesecneRezijeDo, 
    stanje, grejanje, agencija){
    const data = {
      cenaOd : cenaOd,
      cenaDo: cenaDo,
      kvadraturaOd : kvadraturaOd,
      kvadraturaDo : kvadraturaDo,
      brojSobaOd: brojSobaOd,
      brojSobaDo: brojSobaDo,
      godinaIzgradnjeOd: godinaIzgradnjeOd,
      godinaIzgradnjeDo: godinaIzgradnjeDo,
      spratOd: spratOd,
      spratDo: spratDo,
      mesecneRezijeOd: mesecneRezijeOd,
      mesecneRezijeDo: mesecneRezijeDo,
      stanje: stanje,
      grejanje: grejanje,
      agencija: agencija
    }

   return this.http.post(`${this.uri}/nekretnine/slozenaPretragaPrebroj`, data)
  }
  


  dohvatiNekretnineZaKorisnika(korisnickoIme){
    const data = {
      korisnickoIme : korisnickoIme
    }
    return this.http.post(`${this.uri}/nekretnine/dohvatiNekretnineZaKorisnika`, data)
  }

  prodajNekretninu(id, mesec){
    
    const data = {
      id : id,
      mesec: mesec
    }
    return this.http.post(`${this.uri}/nekretnine/prodajNekretninu`, data)
  }

  dodajMikrolokaciju(naziv, grad, opstina, ulice){
    const data = {
      naziv : naziv,
      grad: grad,
      opstina: opstina,
      ulice: ulice
    }
    return this.http.post(`${this.uri}/nekretnine/dodajMikrolokaciju`, data)
  }

  obrisiMikrolokaciju(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.uri}/nekretnine/obrisiMikrolokaciju`, data)
  }

  postojiLiNekretninaNaMikrolokaciji(mikrolokacija, opstina, grad){
    
    const data = {
      mikrolokacija :mikrolokacija,
      opstina: opstina,
      grad: grad
    }
    return this.http.post(`${this.uri}/nekretnine/postojiLiNekretninaNaMikrolokaciji`, data)
  }
}
