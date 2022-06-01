import { ApiServiceService } from './../../../services/apiService.service';
import { aracdetaybilgi } from './../../../models/aracdetaybilgi';
import { araclar } from './../../../models/araclar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aracdialog',
  templateUrl: './aracdialog.component.html',
  styleUrls: ['./aracdialog.component.scss']
})
export class AracdialogComponent implements OnInit {


  dialogBaslik: string;
  yeniKayit: araclar;
  aracdetayBilgi : aracdetaybilgi;
  konuId : number;
  kullaniciId : number;
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AracdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiServiceService,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    this.aracdetayBilgi = data.kayit.AracDetayBilgi;
    if(this.islem=='ekle'){
      this.dialogBaslik='Araç Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Araç Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {

  }

  
  FormOlustur(){
    return this.frmBuild.group({
      AracMarka:[this.yeniKayit.AracMarka],
      AracModel:[this.yeniKayit.AracModel],
      AracPlaka:[this.yeniKayit.AracPlaka],
      AracUretimTarihi:[this.yeniKayit.AracUretimTarihi],
      AracGunlukFiyat:[this.yeniKayit.AracGunlukFiyat],
    });
  }
  
  

}