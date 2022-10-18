import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Korisnik } from './models/korisnik';


   


@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { 
    let ulogovan = JSON.parse(localStorage.getItem("ulogovan"))
    this.currentUser.next(ulogovan)
  }

  public currentUser: BehaviorSubject<Korisnik> = new BehaviorSubject<Korisnik>(null);
}
