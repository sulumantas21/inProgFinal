import { ApiServiceService } from './../../../services/apiService.service';
import { aracdetaybilgi } from './../../../models/aracdetaybilgi';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aracdetaydialog',
  templateUrl: './aracdetaydialog.component.html',
  styleUrls: ['./aracdetaydialog.component.scss']
})
export class AracdetaydialogComponent implements OnInit {
  dialogBaslik: string;
  aracdetayBilgi : aracdetaybilgi;
  konuId : number;
  kullaniciId : number;
  islem : string;
  frm : FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AracdetaydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public apiservis: ApiServiceService,
  ) { 
    this.islem = data.islem
    this.aracdetayBilgi = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Araç Detay Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Araç Detay Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {

  }
  FormOlustur(){
    return this.frmBuild.group({
      AracDetayAracId :[ JSON.parse(localStorage.getItem('aracId'))],
      AracAlimYili:[this.aracdetayBilgi.AracAlimYili],
      AracKasaTipi:[this.aracdetayBilgi.AracKasaTipi],
      AracKm:[this.aracdetayBilgi.AracKm],
      AracKoltukSayisi:[this.aracdetayBilgi.AracKoltukSayisi],
      AracMotorGucu:[this.aracdetayBilgi.AracMotorGucu],
      AracMotorHacmi:[this.aracdetayBilgi.AracMotorHacmi],
      AracRenk:[this.aracdetayBilgi.AracRenk],
      AracTuru:[this.aracdetayBilgi.AracTuru],
      AracVitesTipi:[this.aracdetayBilgi.AracVitesTipi],
      AracYakitTipi:[this.aracdetayBilgi.AracYakitTipi],
    });
  }
}