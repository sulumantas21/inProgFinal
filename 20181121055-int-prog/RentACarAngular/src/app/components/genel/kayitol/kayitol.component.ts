import { musteriler } from './../../../models/musteriler';
import { MyalertserviceService } from './../../../services/myalertservice.service';
import { Component, OnInit } from '@angular/core';
import { sonuc } from 'src/app/models/sonuc';
import { ApiServiceService } from 'src/app/services/apiService.service';

@Component({
  selector: 'app-kayitol',
  templateUrl: './kayitol.component.html',
  styleUrls: ['./kayitol.component.css']
})
export class KayitolComponent implements OnInit {
yenikayit: musteriler;
  constructor(
    public apiServis: ApiServiceService,
    public alert: MyalertserviceService,
  ) { }

  ngOnInit() {
  }
  KayitOl(KullaniciAdi: string, parola: string,adsoyad: string ,email :string, tc: string,telefon:string,adresil:string,adresiki:string){
    this.yenikayit = new musteriler();
    this.yenikayit.KullaniciAdi = KullaniciAdi;
    this.yenikayit.Sifre = parola;
    this.yenikayit.AdSoyad = adsoyad;
    this.yenikayit.Email = email;
    this.yenikayit.MusteriTc = tc;
    this.yenikayit.MusteriTel = telefon;
    this.yenikayit.MusteriAdresIlk = adresil;
    this.yenikayit.MusteriAdresIkinci = adresiki;
    console.log(this.yenikayit);
    this.apiServis.MusteriEkle(this.yenikayit).subscribe((d: sonuc)=>{
      console.log(d );
      this.alert.AlertUygula(d);
      location.href="/login"
    }
  )}
}
