import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-silmedialog',
  templateUrl: './silmedialog.component.html',
  styleUrls: ['./silmedialog.component.scss']
})
export class SilmedialogComponent implements OnInit {

  dialogMesaj: string;
  constructor(
    public dialogRef: MatDialogRef<SilmedialogComponent>
  ) { }

  ngOnInit() {
  }

}
