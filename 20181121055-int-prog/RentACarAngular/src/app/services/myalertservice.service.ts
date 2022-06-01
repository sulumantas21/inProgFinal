import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../components/dialogs/alert/alert.component';
import { sonuc } from '../models/sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyalertserviceService {
  private alertDialogRef: MatDialogRef<AlertComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }
AlertUygula(s: sonuc) {
  var baslik = "";
  if (s.islem) {
    baslik = "İşlem Tamam";
  } else {
    baslik = "Hata";
  }

  this.alertDialogRef = this.matDialog.open(AlertComponent, {
    width: '300px'
  });
  this.alertDialogRef.componentInstance.dialogBaslik = baslik;
  this.alertDialogRef.componentInstance.dialogMesaj = s.mesaj;
  this.alertDialogRef.componentInstance.dialogIslem = s.islem;

  this.alertDialogRef.afterClosed().subscribe(d => {
    this.alertDialogRef = null;
  });
}

}
