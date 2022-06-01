import { musteriler } from './../../../models/musteriler';
import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { SilmedialogComponent } from './../../dialogs/silmedialog/silmedialog.component';
import { KullanicidialogComponent } from './../../dialogs/kullanicidialog/kullanicidialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { sonuc } from 'src/app/models/sonuc';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-kullaniciislemleriadmin',
  templateUrl: './kullaniciislemleriadmin.component.html',
  styleUrls: ['./kullaniciislemleriadmin.component.scss']
})
export class KullaniciislemleriadminComponent implements OnInit {
  dataSource: any;
  id : string;
  uyeler : musteriler[];
  dialogRef : MatDialogRef<KullanicidialogComponent>;
  silemDialog : MatDialogRef<SilmedialogComponent>;
  displayedColumns =[ 'AdSoyad','KullaniciAdi','Email','Sifre','UyeAdmin','MusteriTc','MusteriTel','MusteriAdres1','MusteriAdres2','MusteriRezSay','islemler']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis : ApiServiceService,
    public matDialog : MatDialog,
    public alert : MyalertserviceService
  ) { }

  ngOnInit() {
    this.UyeListe();

  }
  UyeListe(){

    this.apiServis.MusteriListe().subscribe((d : musteriler[])=>{
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  UyeFiltrele(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
  UyeEkle(){
    var yeniKayit : musteriler = new musteriler();
    this.dialogRef= this.matDialog.open(KullanicidialogComponent,{
      width : '600px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.MusteriEkle(d).subscribe((s:sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UyeListe();
          }
        });
      }
    })
  }
SetUyeIdInLocalStrorage(Uyes : musteriler){
  if(JSON.parse(localStorage.getItem('kadi')) == null){
    localStorage.setItem('kadi', JSON.stringify(Uyes.uyeId))
  }
  else{
    var a = JSON.parse(localStorage.getItem('kadi'));
    a = Uyes.uyeId;
    localStorage.setItem("kadi",JSON.stringify(a));
  }
}

UyeSil(kayit: musteriler){
  this.silemDialog = this.matDialog.open(SilmedialogComponent,{
    width : '500px'
  });
  this.silemDialog.componentInstance.dialogMesaj=kayit.KullaniciAdi + "'na Sahip Kullanıcı Silinecektir Onaylıyor musunuz ?"
  this.silemDialog.afterClosed().subscribe(d=>{
    if(d){
      
      this.apiServis.MusteriSil(kayit.uyeId).subscribe((s:sonuc) =>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.UyeListe();
        }
      })
    }
  })
}
UyeGuncelle(kayit:musteriler){
  this.dialogRef= this.matDialog.open(KullanicidialogComponent,{
    width : '300px',
    data:{
      kayit:kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){

      kayit.AdSoyad = d.AdSoyad;
      kayit.KullaniciAdi = d.KullaniciAdi;
      kayit.Email = d.Email;
      kayit.Sifre = d.Sifre;
      kayit.MusteriAdresIkinci = d.MusteriAdresIkinci;
      kayit.MusteriAdresIlk = d.MusteriAdresIlk;
      kayit.MusteriTc = kayit.MusteriTc;
      kayit.MusteriTel= d.MusteriTel;

      this.apiServis.MusteriGuncelle(kayit.uyeId,kayit).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.UyeListe();
        }
      });
    }
  })


}
UyeAdminYap(kayit:musteriler){
  this.silemDialog = this.matDialog.open(SilmedialogComponent,{
    width : '500px'
  });
  this.silemDialog.componentInstance.dialogMesaj = kayit.KullaniciAdi + " Adlı Kullanıcı Admin Yapılsınmı?"
  this.silemDialog.afterClosed().subscribe(d=>{
    if(d){
      kayit.UyeAdmin = 1;
      this.apiServis.MusteriGuncelle(kayit.MusteriTc,kayit).subscribe((s:sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListe();
        }
      })
    }
  })
}
}