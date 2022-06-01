import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { rezervasyon } from 'src/app/models/rezervasyon';
import { ApiServiceService } from 'src/app/services/apiService.service';
import { MyalertserviceService } from 'src/app/services/myalertservice.service';
import { RezervasyondialogComponent } from '../../dialogs/rezervasyondialog/rezervasyondialog.component';
import { SilmedialogComponent } from '../../dialogs/silmedialog/silmedialog.component';

@Component({
  selector: 'app-rezervasyonlarim',
  templateUrl: './rezervasyonlarim.component.html',
  styleUrls: ['./rezervasyonlarim.component.css']
})
export class RezervasyonlarimComponent implements OnInit {
  dataSource: any;
  Rezler : rezervasyon[];
  dialogRef : MatDialogRef<RezervasyondialogComponent>;
  silemDialog : MatDialogRef<SilmedialogComponent>;
  displayedColumns =['AracPlaka', 'AracMarka','AracModel','AracGunlukFiyat','RezBaslangic','RezBitis','RezGunSayisi','RezTutar','MusteriAd','MusteriTc','MusteriTel','MusteriEmail']
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

    this.apiServis.RezListByMusteri(localStorage.getItem("uyeId")).subscribe((d : rezervasyon[])=>{
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

}