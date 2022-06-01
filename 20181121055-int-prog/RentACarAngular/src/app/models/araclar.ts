import { aracdetaybilgi } from "./aracdetaybilgi";
import { aracfoto } from "./aracfoto";

export class araclar{
    AracId : string;
    AracPlaka : string;
    AracMarka : string;
    AracModel : string;
    AracUretimTarihi : Date;
    AracGunlukFiyat : number;
    AracKullanilabilir: number;
    AracDetayBilgi: aracdetaybilgi;
    FotoBilgi : aracfoto;
    
}