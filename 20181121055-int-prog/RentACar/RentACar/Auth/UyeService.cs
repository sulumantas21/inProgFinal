using RentACar.Models;
using RentACar.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentACar.Auth
{
    public class UyeService
    {
        RentACarDatabaseEntities1 db = new RentACarDatabaseEntities1();
        public MusterilerModel UyeOturumAc(string KullaniciAdi, string parola)
        {
            MusterilerModel uye = db.Musteris.Where(s => s.KullaniciAdi == KullaniciAdi && s.Sifre == parola).Select(x => new MusterilerModel()
                {
                uyeId = x.uyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                MusteriTc = x.MusteriTc,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin,
                MusteriTel = x.MusteriTel,
                MusteriAdresIlk = x.MusteriAdresIlk,
                MusteriAdresIkinci = x.MusteriAdresIkinci,
                MusteriRezSay = x.MusteriRezSay,

            }).SingleOrDefault();
                return uye;
            
        }
    }
}