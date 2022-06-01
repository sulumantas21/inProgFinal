import { KayitolComponent } from './components/genel/kayitol/kayitol.component';
import { AracislemlerigenelComponent } from './components/genel/aracislemlerigenel/aracislemlerigenel.component';
import { FiyatsorgulaComponent } from './components/genel/fiyatsorgula/fiyatsorgula.component';
import { LoginComponent } from './components/genel/login/login.component';
import { RezervasyonislemleriadminComponent } from './components/Admin/rezervasyonislemleriadmin/rezervasyonislemleriadmin.component';
import { KullaniciislemleriadminComponent } from './components/Admin/kullaniciislemleriadmin/kullaniciislemleriadmin.component';
import { AracislemleriadminComponent } from './components/Admin/aracislemleriadmin/aracislemleriadmin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RezervasyonlarimComponent } from './components/genel/rezervasyonlarim/rezervasyonlarim.component';


const routes: Routes = [

  {path: "araclarbyadmin", component: AracislemleriadminComponent},
  {path: "kullanicibyadmin", component: KullaniciislemleriadminComponent},
  {path: "rezervasyonbyadmin", component: RezervasyonislemleriadminComponent},
  {path: "login", component: LoginComponent},
  {path: "fiyatsorgula", component: FiyatsorgulaComponent},
  {path: "aracislemleri", component: AracislemlerigenelComponent},
  {path: "kayitol", component: KayitolComponent},
  {path: "rezervasyonlarim", component: RezervasyonlarimComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
