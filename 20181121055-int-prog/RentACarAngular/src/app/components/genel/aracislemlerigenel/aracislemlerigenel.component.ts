import { sonuc } from './../../../models/sonuc';
import { MusrezekraniComponent } from './../musrezekrani/musrezekrani.component';
import { MyalertserviceService } from './../../../services/myalertservice.service';
import { ApiServiceService } from './../../../services/apiService.service';
import { araclar } from './../../../models/araclar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-aracislemlerigenel',
  templateUrl: './aracislemlerigenel.component.html',
  styleUrls: ['./aracislemlerigenel.component.scss']
})
export class AracislemlerigenelComponent implements OnInit {
  dataSource: any;
  rezDialog: MatDialogRef<MusrezekraniComponent>;
  araclar : araclar[];
  displayedColumns =[ 'AracFoto','AracMarka','AracModel','AracUretimTarihi','AracGunlukFiyat','AracKasaTipi','AracKm','AracMotorGucu','AracMotorHacmi','AracRenk','AracVitesTipi','AracYakitTipi','islemler']
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    
    public apiServis : ApiServiceService,
    public matDialog : MatDialog,
    public alert : MyalertserviceService,
    
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
  RezOlustur(){
    this.rezDialog= this.matDialog.open(MusrezekraniComponent,{
      width: '400px',
      data:{
        islem: "ekle"
      }
    });
    console.log("buraya girdi");
    this.rezDialog.afterClosed().subscribe((d:sonuc)=>{
      if(d){
          this.alert.AlertUygula(d);
          }
        });
      }
    }