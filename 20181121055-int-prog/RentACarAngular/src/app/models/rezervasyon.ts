import { araclar } from './araclar';
import { musteriler } from './musteriler';
export class rezervasyon{
    RezId:string;
    RezTarih:Date;
    RezBaslangic:Date;
    RezBitis:Date;
    RezAracId:string;
    RezMusteriId:string;
    RezGunSayisi :number; 
    RezTutar :number;
    musteriBilgi : musteriler;
    aracBilgi :araclar;
}