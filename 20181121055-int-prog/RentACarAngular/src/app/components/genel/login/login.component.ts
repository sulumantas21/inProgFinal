import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { Component, OnInit } from '@angular/core';
import { sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    public apiServis: ApiServiceService,
    public alert: MyalertserviceService,
  ) { }

  ngOnInit() {
  }
  OturumAc(KullaniciAdi: string, parola: string){
    this.apiServis.tokenAl(KullaniciAdi,parola).subscribe((d: any)=>{
      console.log(d );
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("uyeId",d.uyeId);
      localStorage.setItem("uyeKullaniciAdi",d.uyeKullaniciAdi);
      localStorage.setItem("uyeYetkileri",d.uyeYetkileri);
      location.href="/";
    },err=>{
      var s:sonuc = new sonuc();
      s.islem=false;
      s.mesaj="Bilgiler Geçersiz";
      this.alert.AlertUygula(s);
    })
  }
}
