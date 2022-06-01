import { RezervasyonlarimComponent } from './components/genel/rezervasyonlarim/rezervasyonlarim.component';
import { MusrezekraniComponent } from './components/genel/musrezekrani/musrezekrani.component';
import { KayitolComponent } from './components/genel/kayitol/kayitol.component';
import { FiyatsorgulaComponent } from './components/genel/fiyatsorgula/fiyatsorgula.component';
import { LoginComponent } from './components/genel/login/login.component';
import { AracislemlerigenelComponent } from './components/genel/aracislemlerigenel/aracislemlerigenel.component';
import { RezervasyonislemleriadminComponent } from './components/Admin/rezervasyonislemleriadmin/rezervasyonislemleriadmin.component';
import { KullaniciislemleriadminComponent } from './components/Admin/kullaniciislemleriadmin/kullaniciislemleriadmin.component';
import { AracislemleriadminComponent } from './components/Admin/aracislemleriadmin/aracislemleriadmin.component';
import { SilmedialogComponent } from './components/dialogs/silmedialog/silmedialog.component';
import { RezervasyondialogComponent } from './components/dialogs/rezervasyondialog/rezervasyondialog.component';
import { KullanicidialogComponent } from './components/dialogs/kullanicidialog/kullanicidialog.component';
import { FotodialogComponent } from './components/dialogs/fotodialog/fotodialog.component';
import { AracdialogComponent } from './components/dialogs/aracdialog/aracdialog.component';
import { AracdetaydialogComponent } from './components/dialogs/aracdetaydialog/aracdetaydialog.component';
import { MaterialModule } from './material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/dialogs/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AlertComponent,
    AracdetaydialogComponent,
    AracdialogComponent,
    FotodialogComponent,
    KullanicidialogComponent,
    RezervasyondialogComponent,
    KayitolComponent,
    SilmedialogComponent,
    AracislemleriadminComponent,
    KullaniciislemleriadminComponent,
    RezervasyonislemleriadminComponent,
    AracislemlerigenelComponent,
    LoginComponent,
    FiyatsorgulaComponent,
    MusrezekraniComponent,
    RezervasyonlarimComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
