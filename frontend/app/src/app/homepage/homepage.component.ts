import { Component, OnInit } from '@angular/core';
import { Nekretnina } from '../models/nekretnina';
import { RealestatesService } from '../realestates.service';
import { UsersService } from '../services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private servis : RealestatesService, private korisnikServiis : UsersService,
    private sanitizer: DomSanitizer, private ruter: Router) { }

  ngOnInit(): void {
    this.servis.dohvatiNekretnine(0, 5).subscribe((n: Nekretnina[])=>{
      this.nekretnine = n

      this.nekretnine.forEach(n => {

        let randomNumber = Math. floor(Math.random() * (n.slike.length));
      
        this.korisnikServiis.dohvatiProfilnu(n.slike[randomNumber]).subscribe((data)=>{      
          let objectURL = URL.createObjectURL(data);       
          n.naslovnaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          
        }, error => {
          console.log(error);
        });
        
        this.servis.prosecnaCena(n.tip, n.mikrolokacija).subscribe((resp)=>{
          n.prosecnaCena = resp[0]["average"].toFixed(2);
        })

      })
    })
    
  }

  nekretnine : Nekretnina[] = []
 

  detaljnije(n: Nekretnina){
    localStorage.setItem("trenutnaNekretnina", JSON.stringify(n))
    this.ruter.navigate(['realestateDetails'])
  }
}
