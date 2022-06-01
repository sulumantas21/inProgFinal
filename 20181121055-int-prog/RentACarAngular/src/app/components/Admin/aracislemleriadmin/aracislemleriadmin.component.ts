import { aracdetaybilgi } from './../../../models/aracdetaybilgi';
import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { SilmedialogComponent } from './../../dialogs/silmedialog/silmedialog.component';
import { AracdetaydialogComponent } from './../../dialogs/aracdetaydialog/aracdetaydialog.component';
import { FotodialogComponent } from './../../dialogs/fotodialog/fotodialog.component';
import { AracdialogComponent } from './../../dialogs/aracdialog/aracdialog.component';
import { aracfoto } from './../../../models/aracfoto';
import { araclar } from './../../../models/araclar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { sonuc } from 'src/app/models/sonuc';

@Component({
  selector: 'app-aracislemleriadmin',
  templateUrl: './aracislemleriadmin.component.html',
  styleUrls: ['./aracislemleriadmin.component.scss']
})
export class AracislemleriadminComponent implements OnInit {
  dataSource: any;
  araclar : araclar[];
  base64: string;
  fileSelected: Blob;
  af : aracfoto;

  imageUrl: string;
  dialogRef : MatDialogRef<AracdialogComponent>;
  fotoDialog : MatDialogRef<FotodialogComponent>;
  detDialog : MatDialogRef<AracdetaydialogComponent>;
  silemDialog : MatDialogRef<SilmedialogComponent>;
  displayedColumns =[ 'AracMarka','AracModel','AracPlaka','AracUretimTarihi','AracGunlukFiyat','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private sant : DomSanitizer,
    public apiServis : ApiServiceService,
    public matDialog : MatDialog,
    public alert : MyalertserviceService
  ) { }

  ngOnInit() {
    this.AracListe();

  }
  AracListe(){

    this.apiServis.AracListe().subscribe((d : araclar[])=>{
      this.araclar = d;
      this.dataSource = new MatTableDataSource(this.araclar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  AracFiltrele(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  AracEklee(){
    var yeniKayit : araclar = new araclar();
    this.dialogRef= this.matDialog.open(AracdialogComponent,{
      width : '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        console.log(d);
        this.apiServis.AracEkle(d).subscribe((s:sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AracListe();
          }
        });
      }
    })
  }

  AracDetayEkle(){
    var yeniKayit : aracdetaybilgi = new aracdetaybilgi();
    this.detDialog= this.matDialog.open(AracdetaydialogComponent,{
      width : '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.detDialog.afterClosed().subscribe(d=>{
      if(d){
        console.log(d);
        this.apiServis.AracDetayEkle(d).subscribe((s:sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.AracListe();
          }
        });
      }
    })
  
}
SetAracIdInLocalStrorage(Aracs : araclar){
  if(JSON.parse(localStorage.getItem('aracId')) == null){
    localStorage.setItem('aracId', JSON.stringify(Aracs.AracId))
  }
  else{
    var a = JSON.parse(localStorage.getItem('aracId'));
    a = Aracs.AracId;
    localStorage.setItem("aracId",JSON.stringify(a));
  }
}

AracSil(kayit: araclar){
  this.silemDialog = this.matDialog.open(SilmedialogComponent,{
    width : '500px'
  });
  this.silemDialog.componentInstance.dialogMesaj=kayit.AracPlaka + " Plakalı Arac Ve Detayı  Silinecektir Onaylıyor musunuz ?"
  this.silemDialog.afterClosed().subscribe(d=>{
    if(d){
      
      this.apiServis.AracSil(kayit.AracId).subscribe((s:sonuc) =>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.AracListe();
        }
      })
    }
  })
}
AracGuncelle(kayit:araclar){
  this.dialogRef= this.matDialog.open(AracdialogComponent,{
    width : '300px',
    data:{
      kayit:kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){

      kayit.AracGunlukFiyat = d.AracGunlukFiyat;
      kayit.AracKullanilabilir = d.AracKullanilabilir;
      kayit.AracMarka = d.AracMarka;
      kayit.AracModel = d.AracModel;
      kayit.AracPlaka = d.AracPlaka;
      kayit.AracUretimTarihi = d.AracUretimTarihi;

      this.apiServis.AracUpdate(kayit).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.AracListe();
        }
      });
    }
  })


}
AracPasifAl(kayit:araclar){
  this.silemDialog = this.matDialog.open(SilmedialogComponent,{
    width : '500px'
  });
  this.silemDialog.componentInstance.dialogMesaj = kayit.AracPlaka + "Plakalı Araç Pasife Alınacaktır Eminimisiniz?"
  this.silemDialog.afterClosed().subscribe(d=>{
    if(d){
      this.apiServis.AracPasifAl(kayit).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.AracListe();
        }
      })
    }
  })
}

AracFotoEkle(){
  var yeniKayit : aracfoto = new aracfoto();
  this.fotoDialog= this.matDialog.open(FotodialogComponent,{
    width : '400px',
    data:{
      kayit:yeniKayit,
      islem: 'ekle'
    }
  });
  this.fotoDialog.afterClosed().subscribe(d=>{
    if(d){
      console.log(d);
      this.apiServis.FotoEkle(d).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.AracListe();
        }
      });
  }
  })
}
}