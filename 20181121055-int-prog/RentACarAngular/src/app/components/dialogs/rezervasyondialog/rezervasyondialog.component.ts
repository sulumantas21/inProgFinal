import { ApiServiceService } from './../../../services/apiService.service';
import { musteriler } from './../../../models/musteriler';
import { araclar } from './../../../models/araclar';
import { rezervasyon } from './../../../models/rezervasyon';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rezervasyondialog',
  templateUrl: './rezervasyondialog.component.html',
  styleUrls: ['./rezervasyondialog.component.scss']
})
export class RezervasyondialogComponent implements OnInit {

  dialogBaslik: string;
  yeniKayit: rezervasyon;
  araclar : araclar[];
  musteriler : musteriler[];
  AracId : string;
  musId : string;
  islemYapId : number;
  kullaniciId : number;
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RezervasyondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiServiceService,
  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Rezervasyon Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Rezervasyon Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {
    this.MusteriListe();
    this.AracListe();

  }
  FormOlustur(){
    if(this.islem=='duzenle'){
      console.log(this.yeniKayit);
      return this.frmBuild.group({
        RezBaslangic:[this.yeniKayit.RezBaslangic],
        RezBitis:[this.yeniKayit.RezBitis],
        RezAracId:[this.yeniKayit.RezAracId],
        RezMusteriId:[this.yeniKayit.RezMusteriId],
      });
    }
    else{
return this.frmBuild.group({
      RezBaslangic:[this.yeniKayit.RezBaslangic],
      RezBitis:[this.yeniKayit.RezBitis],
      RezAracId:[this.AracId],
      RezMusteriId:[this.musId],
    });
    }
    
  }
  AracListe(){
    this.apiservis.AracListe().subscribe((d: araclar[])=>{
      this.araclar = d;
    })
  }
  MusteriListe(){
    this.apiservis.MusteriListe().subscribe((d: musteriler[])=>{
      this.musteriler = d;
    })
  }

  AracSec(aracId: string){
    console.log(aracId);
    this.AracId = aracId;
  }
  MusSec(musId: string){
    this.musId = musId;
  }
}