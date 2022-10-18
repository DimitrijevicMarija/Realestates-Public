export class Nekretnina{
    naziv : string
    tip : string
    opis : string
    grad : string
    opstina : string
    mikrolokacija : string
    ulica : string
    kvadratura : number
    brojSoba : number //5+ je 6
    godinaIzgradnje : number
    stanje : string
    grejanje : string
    sprat : number
    ukupnaSpratnost : number 
    oglasivac : string
    agencija : string // cuvamo agenciju jer agent moze da je promeni
    rezije : number
    cena : number
    slike : Array<string>
    linije : string // samo string 25, 25P
    prodato : number //1-12 kao mesec
    poslednjaIzmena : string
    //dodaj karakteristike 
    parking : boolean  //0-1
    terasa : boolean
    lodja : boolean
    francBalkon : boolean
    lift : boolean
    podrum : boolean
    garaza : boolean
    basta : boolean
    klima : boolean
    internet : boolean
    interfon : boolean
    telefon : boolean
    naslovnaUrl // sta ce se prikazati kao glavna fotografija
    prosecnaCena: number
    _id : string
}