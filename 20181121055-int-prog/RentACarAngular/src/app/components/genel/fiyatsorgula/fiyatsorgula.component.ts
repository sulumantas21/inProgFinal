import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { araclar } from './../../../models/araclar';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-fiyatsorgula',
  templateUrl: './fiyatsorgula.component.html',
  styleUrls: ['./fiyatsorgula.component.scss']
})
export class FiyatsorgulaComponent implements OnInit {
  dataSource: any;
  pipe = new DatePipe('en-US');
  fiyat : sonuc;
  araclar: araclar[];
  aracplaka : string;
  bas: string;
  bit : string;
  sonucc : sonuc;
  constructor(
    public apiServis : ApiServiceService,
    public matDialog : MatDialog,
    public alert : MyalertserviceService
  ) { }

  ngOnInit() {
    this.AracListe();

  }
  FiyatSorgu(){

    this.apiServis.FiyatSorgula(this.bas,this.bit,this.aracplaka).subscribe((d : sonuc)=>{
      this.fiyat = d;
      this.alert.AlertUygula(this.fiyat);
      
    })
  }
  AracListe(){
    this.apiServis.AracListe().subscribe((d: araclar[])=>{
      this.araclar = d;
    })
  }
  AracSec(aracId: string){
    console.log(aracId);
    this.aracplaka = aracId;
  }
  BasSec(bas: Date){
    
    this.bas =this.pipe.transform(bas, 'MM-dd-yyyy');
    console.log(this.bas);
  }
  BitSec(bit: Date){
    this.bit = this.pipe.transform(bit, 'MM-dd-yyyy');
    console.log(this.bit);

  }
}