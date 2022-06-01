import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { aracfoto } from './../../../models/aracfoto';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-fotodialog',
  templateUrl: './fotodialog.component.html',
  styleUrls: ['./fotodialog.component.scss']
})
export class FotodialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: aracfoto;
  islem : string;
  frm : FormGroup;
  fileSelected: Blob;
  af : aracfoto;
  base64: string;
  imageUrl: string;
  constructor(
    private sant : DomSanitizer,
    public apiServis : ApiServiceService,
    public dialogRef: MatDialogRef<FotodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public frmBuild: FormBuilder,
    public alert : MyalertserviceService

  ) { 
    this.islem = data.islem
    this.yeniKayit = data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik='Foto Ekle'
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik='Foto Düzenle'
    }
    this.frm = this.FormOlustur();
  }
  

  ngOnInit() {
  }
  onSelectNewFile(files: FileList){
    this.fileSelected = files[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    this.convertFileToBase64();
    console.log(this.base64);
  }
  convertFileToBase64()
  {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onload=()=>{
      this.base64= reader.result as string;
    }
  }
  AracFotoEkle(){
    this.yeniKayit.AracId = JSON.parse(localStorage.getItem("aracId"));
    this.yeniKayit.FotoBase64 = this.base64;
    console.log(this.yeniKayit);
        this.apiServis.FotoEkle(this.yeniKayit).subscribe((s:sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
          }
        });
    }
  FormOlustur(){
    return this.frmBuild.group({
      FotoBase64:[this.base64],
      FotoAracId:[JSON.parse(localStorage.getItem("aracId"))],
    });
  }
}