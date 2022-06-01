import { sonuc } from './../../../models/sonuc';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { araclar } from 'src/app/models/araclar';
import { musteriler } from 'src/app/models/musteriler';
import { rezervasyon } from 'src/app/models/rezervasyon';
import { ApiServiceService } from 'src/app/services/apiService.service';
import { RezervasyondialogComponent } from '../../dialogs/rezervasyondialog/rezervasyondialog.component';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';

@Component({
  selector: 'app-musrezekrani',
  templateUrl: './musrezekrani.component.html',
  styleUrls: ['./musrezekrani.component.css']
})
export class MusrezekraniComponent implements OnInit {
  rez : rezervasyon;
  frm : FormGroup;
  islem : string;
  dialogBaslik: string;
  constructor(
    public dialogRef: MatDialogRef<RezervasyondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiServiceService,
    public alert : MyalertserviceService
  ) { 
    this.islem = data.islem
    this.rez = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Rezervasyon Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Rezervasyon Düzenle'
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  Kaydet(bas : Date, bit : Date){
    this.rez = new rezervasyon();
    this.rez.RezBaslangic = bas;
    this.rez.RezBitis = bit;
    this.rez.RezAracId = JSON.parse(localStorage.getItem("aracId")) as string;
    this.rez.RezMusteriId = localStorage.getItem("uyeId") as string;
    this.apiservis.RezEkle(this.rez).subscribe((s:sonuc)=>{
      this.alert.AlertUygula(s);
      this.dialogRef.close();
    })
  }
  FormOlustur(){
    if(this.islem=='duzenle'){
      return this.frmBuild.group({
        RezBaslangic:[this.rez.RezBaslangic],
        RezBitis:[this.rez.RezBitis],
      });
    }
    else{
return this.frmBuild.group({
      RezBaslangic:null,
      RezBitis:null,
    });
    }
    
  }}
  