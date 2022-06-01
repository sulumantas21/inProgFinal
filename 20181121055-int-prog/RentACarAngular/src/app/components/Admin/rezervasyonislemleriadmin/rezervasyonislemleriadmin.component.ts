import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { SilmedialogComponent } from './../../dialogs/silmedialog/silmedialog.component';
import { RezervasyondialogComponent } from './../../dialogs/rezervasyondialog/rezervasyondialog.component';
import { rezervasyon } from './../../../models/rezervasyon';
import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-rezervasyonislemleriadmin',
  templateUrl: './rezervasyonislemleriadmin.component.html',
  styleUrls: ['./rezervasyonislemleriadmin.component.scss']
})
export class RezervasyonislemleriadminComponent implements OnInit {
  dataSource: any;
  Rezler : rezervasyon[];
  dialogRef : MatDialogRef<RezervasyondialogComponent>;
  silemDialog : MatDialogRef<SilmedialogComponent>;
  displayedColumns =['AracPlaka', 'AracMarka','AracModel','AracGunlukFiyat','RezBaslangic','RezBitis','RezGunSayisi','RezTutar','MusteriAd','MusteriTc','MusteriTel','MusteriEmail','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiServiceService,
    public matDialog : MatDialog,
    public alert : MyalertserviceService
  ) { }

  ngOnInit() {
    this.RezListe();

  }
  RezListe(){

    this.apiServis.RezList().subscribe((d : rezervasyon[])=>{
      this.Rezler = d;
      this.dataSource = new MatTableDataSource(this.Rezler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  RezFiltrele(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  RezEkle(){
    var yeniKayit : rezervasyon = new rezervasyon();
    this.dialogRef= this.matDialog.open(RezervasyondialogComponent,{
      width : '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        console.log(d);
        this.apiServis.RezEkle(d).subscribe((s:sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.RezListe();
          }
        });
      }
    })
  }

SetRezIdInLocalStrorage(Rez : rezervasyon){
  if(JSON.parse(localStorage.getItem('rezId')) == null){
    localStorage.setItem('rezId', JSON.stringify(Rez.RezId))
  }
  else{
    var a = JSON.parse(localStorage.getItem('rezId'));
    a = Rez.RezId;
    localStorage.setItem("rezId",JSON.stringify(a));
  }
}

RezSil(kayit: rezervasyon){
  this.silemDialog = this.matDialog.open(SilmedialogComponent,{
    width : '500px'
  });
  console.log(kayit);
  this.silemDialog.componentInstance.dialogMesaj=kayit.aracBilgi.AracPlaka +"'lı Aracın " +formatDate(kayit.RezBaslangic, 'dd-MM-yyyy', 'en')  +" "+ formatDate(kayit.RezBitis, 'dd-MM-yyyy', 'en') + " Tarihlerindeki Rezervasyonu Silinecektir ?"
  this.silemDialog.afterClosed().subscribe(d=>{
    if(d){
      
      this.apiServis.RezSil(kayit.RezId).subscribe((s:sonuc) =>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.RezListe();
        }
      })
    }
  })
}
RezGuncelle(kayit:rezervasyon){
  console.log(kayit); 
  this.dialogRef= this.matDialog.open(RezervasyondialogComponent,{
    width : '300px',
    data:{
      kayit:kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){

      kayit.RezAracId = d.RezAracId;
      kayit.RezBaslangic = d.RezBaslangic;
      kayit.RezBitis = d.RezBitis;
      kayit.RezMusteriId = d.RezMusteriId;
      kayit.RezTarih = d.RezTarih;

      this.apiServis.RezDuzenle(kayit).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.RezListe();
        }
      });
    }
  })


}
}