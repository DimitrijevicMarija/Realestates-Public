export class Korisnik{
    ime : string
    prezime : string
    korisnickoIme : string
    lozinka : string
    grad : string
    datumRodjenja : string
    telefon : string
    imejl : string
    agencija : string
    licenca : string
    tip : string
    profilna : string //to ce biti putanja do slike u nekom folderu
    odobren : string // DA, NE
    urlProfilna
    omiljene : Array<string>
}