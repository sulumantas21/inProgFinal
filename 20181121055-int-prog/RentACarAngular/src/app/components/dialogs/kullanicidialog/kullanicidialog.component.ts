import { musteriler } from './../../../models/musteriler';
import { ApiServiceService } from './../../../services/apiService.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanicidialog',
  templateUrl: './kullanicidialog.component.html',
  styleUrls: ['./kullanicidialog.component.scss']
})
export class KullanicidialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: musteriler;
  konuId : number;
  kullaniciId : number;
  islem : string;
  frm : FormGroup;
  disable: boolean;
  constructor(
    public dialogRef: MatDialogRef<KullanicidialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiServiceService,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Kullanıcı Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Kullanıcı Düzenle'
    }
    this.frm = this.FormOlustur();
    if(this.islem == 'duzenle'){
      this.frm.controls['MusteriTc'].disable();
    }
  }
  

  ngOnInit() {

  }
  DisableYap(){
    this.disable = true;
  }
  FormOlustur(){
    return this.frmBuild.group({
      AdSoyad:[this.yeniKayit.AdSoyad],
      KullaniciAdi:[this.yeniKayit.KullaniciAdi],
      Email:[this.yeniKayit.Email],
      Sifre:[this.yeniKayit.Sifre],
      MusteriTel:[this.yeniKayit.MusteriTel],
      MusteriTc:[this.yeniKayit.MusteriTc],
      MusteriAdresIlk:[this.yeniKayit.MusteriAdresIlk],
      MusteriAdresIkinci:[this.yeniKayit.MusteriAdresIkinci],

    });
  }
  
}