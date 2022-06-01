import { rezervasyon } from './../models/rezervasyon';
import { musteriler } from './../models/musteriler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { aracdetaybilgi } from '../models/aracdetaybilgi';
import { araclar } from '../models/araclar';
import { aracfoto } from '../models/aracfoto';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  uyeId: number;
  apiUrl = "https://localhost:44349/api/";

  constructor(
    public http: HttpClient
  ) { }
    AracListe(){
        return this.http.get(this.apiUrl+"araclist")
    }
    AracEkle(arac : araclar){
        return this.http.post(this.apiUrl+"aracekle",arac);
    }
    AracDetayEkle(aracdet: aracdetaybilgi){
        return this.http.post(this.apiUrl+"aracdetayekle",aracdet);
    }  
    AracSil(aracPlaka: string){
      return this.http.delete(this.apiUrl+"aracsil/"+aracPlaka);
    }
    AracUpdate(Arac: araclar){
      return this.http.put(this.apiUrl+"aracduzenle", Arac);
    }
    AracPasifAl(Arac: araclar){
      return this.http.put(this.apiUrl+"aracpasifyap",Arac)
    }
    MusteriListe(){
      return this.http.get(this.apiUrl+"musterilist")
    }
  MusteriListeByTc(kimlikno : string){
    return this.http.get(this.apiUrl+"musterilist/" + kimlikno)
    }
  MusteriEkle(mus : musteriler){
      return this.http.post(this.apiUrl+"musteriekle",mus);
    }
  MusteriSil(musTc: string){
    return this.http.delete(this.apiUrl+"musteriSil/"+musTc);
    }
  MusteriGuncelle(Id: string, Musteri : musteriler ){
    return this.http.put(this.apiUrl+"musteriduzenle/"+ Id ,Musteri);
    }
  RezList(){
    return this.http.get(this.apiUrl+"rezlist")
  }
  RezListByMusteri(musTc : string){
    return this.http.get(this.apiUrl +"rezlist/"+musTc);
    }
  RezEkle(Rez: rezervasyon){
    return this.http.post(this.apiUrl+"rezekle",Rez);
  }
  RezDuzenle(Rez : rezervasyon){
    return this.http.put(this.apiUrl+"rezduzenle",Rez);
  }
  RezSil(rezId : string){
    return this.http.delete(this.apiUrl+"rezsil/"+rezId);
  }
  FiyatSorgula(baslangic: string ,bitis :string,plaka : string){
    return this.http.get(this.apiUrl+"fiyatsorgu/"+baslangic+"/"+bitis+"/"+plaka)
  }
  tokenAl(kullaniciadi: string,parola:string){
    var data="username=" + kullaniciadi + "&password=" + parola  + "&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"token",data,{headers: reqHeader});
  }
  oturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  adminKontrol(){
    if(localStorage.getItem("uyeYetkileri")=='["Admin"]'){
      return true;
    }
    else{
      return false;
    }
  }

  FotoEkle(aracFoto: aracfoto){
return this.http.post(this.apiUrl+"fotoekle",aracFoto);
  }
}
