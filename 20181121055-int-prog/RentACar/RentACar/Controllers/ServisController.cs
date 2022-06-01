using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using RentACar.ViewModels;
using RentACar.Models;

namespace RentACar.Controllers
{
    public class ServisController : ApiController
    {
        RentACarDatabaseEntities1 db = new RentACarDatabaseEntities1();
        SonucModel sonuc = new SonucModel();

        //ÇALIŞIYOR
        #region Araclar İşlemleri

        //ARAÇLARIN LİSTELENMESİ
        [HttpGet]
        [Route("api/araclist")]
        public List<AraclarModel> AracListele()
        {
            List<AraclarModel> liste = db.Araclars.Where(s => s.AracKullanilabilir == 1).Select(x => new AraclarModel()
            {
                AracId = x.AracId,
                AracMarka = x.AracMarka,
                AracModel = x.AracModel,
                AracPlaka = x.AracPlaka,
                AracUretimTarihi = x.AracUretimTarihi,
                AracGunlukFiyat = x.AracGunlukFiyat,
                AracKullanilabilir = x.AracKullanilabilir,
            }).ToList();
            foreach (var kayit in liste)
            {
                AracDetayModel aracBilgiList = db.AracDetays.Where(s => s.AracDetayAracId == kayit.AracId).Select(x => new AracDetayModel()
                {
                    AracDetayAracId = x.AracDetayAracId,
                    AracAlimYili = x.AracAlimYili,
                    AracKasaTipi = x.AracKasaTipi,
                    AracKm = x.AracKm,
                    AracKoltukSayisi = x.AracKoltukSayisi,
                    AracMotorGucu = x.AracMotorGucu,
                    AracMotorHacmi = x.AracMotorHacmi,
                    AracRenk = x.AracRenk,
                    AracTuru = x.AracTuru,
                    AracVitesTipi = x.AracVitesTipi,
                    AracYakitTipi = x.AracYakitTipi,
                }
                ).FirstOrDefault();
                AracFotografModels fotos = db.AracFotografs.Where(s => s.FotoAracId == kayit.AracId).Select(x => new AracFotografModels()
                {
                    FotoBase64 = x.FotoBase64,
                    AracId = x.FotoAracId,
                    FotoId = x.Id,
                }
                ).FirstOrDefault();
                if (aracBilgiList != null)
                {
                    kayit.AracDetayBilgi = AracById(aracBilgiList.AracDetayAracId);
                }
                if (fotos != null)
                {
                    kayit.FotoBilgi = FotoByArac(fotos.AracId);
                }
            }

            return liste;
        }
        //Araçlarda Plakaya Göre Arama
        public AracDetayModel AracById(string AracId)
        {
            AracDetayModel liste = db.AracDetays.Where(s => s.AracDetayAracId == AracId).Select(x => new AracDetayModel()
            {

                AracDetayAracId = x.AracDetayAracId,
                AracAlimYili = x.AracAlimYili,
                AracKasaTipi = x.AracKasaTipi,
                AracKm = x.AracKm,
                AracKoltukSayisi = x.AracKoltukSayisi,
                AracMotorGucu = x.AracMotorGucu,
                AracMotorHacmi = x.AracMotorHacmi,
                AracRenk = x.AracRenk,
                AracTuru = x.AracTuru,
                AracVitesTipi = x.AracVitesTipi,
                AracYakitTipi = x.AracYakitTipi,

            }).FirstOrDefault();
            return liste;
        }


        public AracFotografModels FotoByArac(string AracId)
        {
            AracFotografModels liste = db.AracFotografs.Where(s => s.FotoAracId == AracId).Select(x => new AracFotografModels()
            {
                FotoId = x.Id,
                FotoBase64= x.FotoBase64,
                AracId = x.FotoAracId,
            }).FirstOrDefault();
            return liste;
        }
        [HttpGet]
        [Route("api/araclist/{AracPlakas}")]

        public AraclarModel AracByPlaka(string AracPlakas)
        {
            AraclarModel liste = db.Araclars.Where(s => s.AracPlaka == AracPlakas).Select(x => new AraclarModel()
            {

                AracId = x.AracId,
                AracMarka = x.AracMarka,
                AracModel = x.AracModel,
                AracPlaka = x.AracPlaka,
                AracUretimTarihi = x.AracUretimTarihi,
                AracGunlukFiyat = x.AracGunlukFiyat,
                AracKullanilabilir = x.AracKullanilabilir,

            }).FirstOrDefault();
            AracDetayModel aracBilgiList = db.AracDetays.Where(s => s.AracDetayAracId == liste.AracId).Select(x => new AracDetayModel()
            {
                AracDetayAracId = x.AracDetayAracId,
                AracAlimYili = x.AracAlimYili,
                AracKasaTipi = x.AracKasaTipi,
                AracKm = x.AracKm,
                AracKoltukSayisi = x.AracKoltukSayisi,
                AracMotorGucu = x.AracMotorGucu,
                AracMotorHacmi = x.AracMotorHacmi,
                AracRenk = x.AracRenk,
                AracTuru = x.AracTuru,
                AracVitesTipi = x.AracVitesTipi,
                AracYakitTipi = x.AracYakitTipi,
            }
            ).FirstOrDefault();


            liste.AracDetayBilgi = AracById(aracBilgiList.AracDetayAracId);
            return liste;
        }

        //Araç Ekleme

        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkleme(AraclarModel model)
        {
            if (db.Araclars.Count(s => s.AracPlaka == model.AracPlaka) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Araç Kayıtlıdır";
                return sonuc;
            }
            Araclar araclar = new Araclar();
            araclar.AracId = Guid.NewGuid().ToString();
            araclar.AracMarka = model.AracMarka;
            araclar.AracModel = model.AracModel;
            araclar.AracPlaka = model.AracPlaka;
            araclar.AracUretimTarihi = model.AracUretimTarihi;
            araclar.AracGunlukFiyat = Convert.ToDecimal(model.AracGunlukFiyat);
            araclar.AracKullanilabilir = 1;
            db.Araclars.Add(araclar);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Başarıyla Eklendi";
            return sonuc;

        }



        [HttpPost]
        [Route("api/aracdetayekle")]
        public SonucModel AracDetayEkleme(AracDetayModel model)
        {
            if (db.Araclars.Where(s=> s.AracId == model.AracDetayAracId).FirstOrDefault() == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Bulunamadı ";
                return sonuc;
            }
            else if (db.AracDetays.Count(s=>s.AracDetayAracId == model.AracDetayAracId)> 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu aracın zaten detayı bulunmaktadır yeni detay eklemesi yapamazsınız lütfen detayı düzenleyiniz..";
                return sonuc;
            }

            AracDetay aracdetay = new AracDetay();
            aracdetay.AracDetayAracId = model.AracDetayAracId;
            aracdetay.AracAlimYili = model.AracAlimYili;
            aracdetay.AracKasaTipi = model.AracKasaTipi;
            aracdetay.AracKm = model.AracKm;
            aracdetay.AracKoltukSayisi = model.AracKoltukSayisi;
            aracdetay.AracMotorGucu = model.AracMotorGucu;
            aracdetay.AracMotorHacmi = model.AracMotorHacmi;
            aracdetay.AracRenk = model.AracRenk;
            aracdetay.AracTuru = model.AracTuru;
            aracdetay.AracVitesTipi = model.AracVitesTipi;
            aracdetay.AracYakitTipi = model.AracYakitTipi;
            aracdetay.Araclar = db.Araclars.Where(s => s.AracId == model.AracDetayAracId).FirstOrDefault();
            db.AracDetays.Add(aracdetay);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Detay Başarıyla Eklendi";
            return sonuc;

        }
        //Araç Düzenleme
        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AraclarModel model)
        {
            Araclar kayit = db.Araclars.Where(s => s.AracPlaka == model.AracPlaka).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.AracGunlukFiyat = Convert.ToDecimal(model.AracGunlukFiyat);
            kayit.AracMarka = model.AracMarka;
            kayit.AracModel = model.AracModel;
            kayit.AracPlaka = model.AracPlaka;
            kayit.AracUretimTarihi = model.AracUretimTarihi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Düzenlendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/aracpasifyap")]
        public SonucModel AracPasifeAl(AraclarModel model)
        {
            Araclar kayit = db.Araclars.Where(s => s.AracPlaka == model.AracPlaka).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.AracKullanilabilir =0;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Pasife Alındı";
            return sonuc;
        }


        //Araç silme 
        [HttpDelete]
        [Route("api/aracsil/{aracId}")]
        public SonucModel AracSil(string aracId)
        {
            Araclar kayit = db.Araclars.Where(s => s.AracId == aracId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Bulunamadı";
                return sonuc;
            }
            AracDetay aracdet = db.AracDetays.Where(s => s.AracDetayAracId == aracId).FirstOrDefault();
            if (aracdet != null)
            {
                db.AracDetays.Remove(aracdet);
            }
            List<AracFotograf> fotos = db.AracFotografs.Where(s => s.FotoAracId == aracId).ToList();
            foreach (var item in fotos)
            {
                db.AracFotografs.Remove(item);
            }
            List<Rezervasyon> rezs = db.Rezervasyons.Where(s => s.RezAracId == aracId).ToList();
            foreach (var item in rezs)
            {
                db.Rezervasyons.Remove(item);
            }
            db.Araclars.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Silindi";
            return sonuc;
        }




        #endregion
        ////ÇALIŞIYOR
        #region Müşteri İşlemleri

        //Müşteri listelenmesi 
        [HttpGet]
        [Route("api/musterilist")]
        public List<MusterilerModel> MusteriList()
        {
            List<MusterilerModel> liste = db.Musteris.Select(x => new MusterilerModel()
            {
                uyeId = x.uyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi= x.KullaniciAdi,
                MusteriTc = x.MusteriTc,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin,
                MusteriTel = x.MusteriTel,
                MusteriAdresIlk = x.MusteriAdresIlk,
                MusteriAdresIkinci = x.MusteriAdresIkinci,
                MusteriRezSay = x.MusteriRezSay,
            }).ToList();
            return liste;
        }
        //Müşteri TC sine göre listeleme
        [HttpGet]
        [Route("api/musterilist/{MusteriTc}")]

        public MusterilerModel MusteriByTc(string MusteriTc)
        {
            MusterilerModel liste = db.Musteris.Where(s => s.MusteriTc == MusteriTc).Select(x => new MusterilerModel()
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

            }).FirstOrDefault();
            return liste;
        }

        //Müşteri Ekleme

        [HttpPost]
        [Route("api/musteriekle")]
        public SonucModel MusteriEkle(MusterilerModel model)
        {
            if (db.Musteris.Count(s => s.MusteriTc == model.MusteriTc) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Müşterinin Kaydı Bulunmaktadır.";
                return sonuc;
            }
            Musteri musteri = new Musteri();
            musteri.uyeId = Guid.NewGuid().ToString();
            musteri.KullaniciAdi = model.KullaniciAdi;
            musteri.Sifre = model.Sifre;
            musteri.UyeAdmin = 0;
            musteri.Email = model.Email;
            musteri.AdSoyad = model.AdSoyad;
            musteri.MusteriTc = model.MusteriTc;
            musteri.MusteriTel = model.MusteriTel;
            musteri.MusteriAdresIlk = model.MusteriAdresIlk;
            musteri.MusteriAdresIkinci = model.MusteriAdresIkinci;
            musteri.MusteriRezSay = 0;
            db.Musteris.Add(musteri);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Kaydı Başarıyla Oluşturuldu.";
            return sonuc;

        }

        public SonucModel MusteriRezSayArttir(string id)
        {
            Musteri mus = db.Musteris.Where(s => s.uyeId == id).FirstOrDefault();
            mus.MusteriRezSay = mus.MusteriRezSay + 1;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yükseldi";
            return sonuc;
        }


        //Müşteri Düzenleme
        [HttpPut]
        [Route("api/musteriduzenle/{uyeId}")]
        public SonucModel MusteriDuzenle(MusterilerModel model, string uyeId)
         {
            Musteri kayit = db.Musteris.Where(s => s.uyeId == uyeId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Müşteri Bulunamadı Müşteri TC Sini Kontrol Ediniz";
                return sonuc;
            }
            else
            {
                kayit.Sifre = model.Sifre;
                kayit.Email = model.Email;
                kayit.AdSoyad = model.AdSoyad;
                kayit.MusteriTc = model.MusteriTc;
                kayit.MusteriTel = model.MusteriTel;
                kayit.MusteriAdresIlk = model.MusteriAdresIlk;
                kayit.MusteriAdresIkinci = model.MusteriAdresIkinci;
            }
            Musteri kayit2 = db.Musteris.Where(s => s.MusteriTc == kayit.MusteriTc).FirstOrDefault();
            
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Düzenlendi";
            return sonuc;
        }
        //Müşteri Sil
        [HttpDelete]
        [Route("api/musteriSil/{musteriTc}")]
        public SonucModel MusteriSil(string musteriTc)
        {
            Musteri kayit = db.Musteris.Where(s => s.uyeId == musteriTc).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Müşterinin Kaydı Bulunamadı";
                return sonuc;
            }
            db.Musteris.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Müşteri Silindi";
            return sonuc;
        }


        #endregion
        //
        #region Rezervasyon İşlemleri

        //Rezervasyon listelenmesi 
        [HttpGet]
        [Route("api/rezlist")]
        public List<RezervasyonModel> RezList()
        {
            List<RezervasyonModel> liste = db.Rezervasyons.Select(x => new RezervasyonModel()
            {
                RezId = x.RezId,
                RezBaslangic = x.RezBaslangic,
                RezBitis =x.RezBitis,
                RezGunSayisi = x.RezGunSayisi,
                RezMusteriId = x.RezMusteriId,
                RezTarih = x.RezTarih,
                RezAracId = x.RezAracId,
                RezTutar = x.RezTutar
            }).ToList();
            foreach (var kayit in liste)
            {
                AraclarModel aracBilgiList = db.Araclars.Where(s => s.AracId == kayit.RezAracId).Select(x => new AraclarModel()
                {
                    AracId = x.AracId,
                    AracMarka = x.AracMarka,
                    AracModel = x.AracModel,
                    AracPlaka = x.AracPlaka,
                    AracUretimTarihi = x.AracUretimTarihi,
                    AracGunlukFiyat = x.AracGunlukFiyat,
                    AracKullanilabilir = x.AracKullanilabilir,
                }
                ).FirstOrDefault();

                MusterilerModel musteriBilgiList = db.Musteris.Where(s => s.uyeId == kayit.RezMusteriId).Select(x => new MusterilerModel()
                {
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
                }
                ).FirstOrDefault();
                kayit.aracBilgi = AracByPlaka(aracBilgiList.AracPlaka);
                kayit.musteriBilgi = MusteriByTc(musteriBilgiList.MusteriTc);
            }
            return liste;
        }
        //Rezervasyonda Müşteriye Göre Arama
        [HttpGet]
        [Route("api/rezlist/{uyeId}")]
        public List<RezervasyonModel> RezByMusteriTc(string uyeId)
        {
            List<RezervasyonModel> liste = db.Rezervasyons.Where(s => s.Musteri.uyeId == uyeId).Select(x => new RezervasyonModel()
            {

                RezId = x.RezId,
                RezBaslangic = x.RezBaslangic,
                RezBitis = x.RezBitis,
                RezGunSayisi = x.RezGunSayisi,
                RezMusteriId = x.RezMusteriId,
                RezTarih = x.RezTarih,
                RezAracId = x.RezAracId,
                RezTutar = x.RezTutar


            }).ToList();
            foreach (var kayit in liste)
            {
                AraclarModel aracBilgiList = db.Araclars.Where(s => s.AracId == kayit.RezAracId).Select(x => new AraclarModel()
                {
                    AracId = x.AracId,
                    AracMarka = x.AracMarka,
                    AracModel = x.AracModel,
                    AracPlaka = x.AracPlaka,
                    AracUretimTarihi = x.AracUretimTarihi,
                    AracGunlukFiyat = x.AracGunlukFiyat,
                    AracKullanilabilir = x.AracKullanilabilir,
                }
            ).FirstOrDefault();

                MusterilerModel musteriBilgiList = db.Musteris.Where(s => s.uyeId == kayit.RezMusteriId).Select(x => new MusterilerModel()
                {
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
                }
                ).FirstOrDefault();
                kayit.aracBilgi = AracByPlaka(aracBilgiList.AracPlaka);
                kayit.musteriBilgi = MusteriByTc(musteriBilgiList.MusteriTc);
            }
            return liste;
        }

        //Rezervasyon Ekleme
        [HttpPost]
        [Route("api/rezekle")]
        public SonucModel RezEkle(RezervasyonModel model)
        {

            Rezervasyon rez = new Rezervasyon();
            rez.RezId = Guid.NewGuid().ToString();
            rez.RezBaslangic = model.RezBaslangic;
            rez.RezBitis = model.RezBitis;
            //Bitiş tarihinde'de ücret alınmak istenir ise gün sayısını 1 arttırmamız gerekiyor.
            rez.RezGunSayisi = Convert.ToInt32((model.RezBitis - model.RezBaslangic).TotalDays);
            rez.RezAracId = model.RezAracId;
            rez.RezMusteriId = model.RezMusteriId;
            rez.RezIslemYapan = model.RezIslemYapan;
            rez.RezTarih = DateTime.Now;
            Araclar arac = db.Araclars.Where(s => s.AracId == model.RezAracId).FirstOrDefault();
            rez.RezTutar = Convert.ToInt32((model.RezBitis - model.RezBaslangic).TotalDays + 1) * arac.AracGunlukFiyat;
            if (arac.AracKullanilabilir == 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu araç şuanda kullanılmakta lütfen başka bir araç seçiniz";
                return sonuc;
            }
            if (db.Rezervasyons.Count(s => s.RezAracId == model.RezAracId && s.RezBaslangic >= model.RezBaslangic && s.RezBaslangic <= model.RezBitis || s.RezBitis <= model.RezBaslangic && s.RezBitis >= model.RezBitis) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Araç Girilen Tarihler Arasında Bir Rezervasyona Kayıtlıdır Lütfen Farklı Bir Araç Seçiniz!";
                return sonuc;
            }
            MusteriRezSayArttir(model.RezMusteriId);
            db.Rezervasyons.Add(rez);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Rezervasyon Kaydı Başarıyla Oluşturuldu.";
            return sonuc;

        }
        //Rezervasyon Düzenleme
        [HttpPut]
        [Route("api/rezduzenle")]
        public SonucModel RezDuzenle(RezervasyonModel model)
        {
            Rezervasyon kayit = db.Rezervasyons.Where(s => s.RezId == model.RezId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Rezervasyon Bulunamadı";
                return sonuc;
            }

            kayit.RezBaslangic = model.RezBaslangic;
            kayit.RezBitis = model.RezBitis;
            kayit.RezGunSayisi = Convert.ToInt32((model.RezBitis - model.RezBaslangic).TotalDays);
            kayit.RezIslemYapan = model.RezIslemYapan;
            kayit.RezMusteriId = model.RezMusteriId;
            kayit.RezTarih = model.RezTarih;
            Araclar arac = db.Araclars.Where(s => s.AracId == model.RezAracId).FirstOrDefault();
            kayit.RezTutar = Convert.ToInt32((model.RezBitis - model.RezBaslangic).TotalDays) * arac.AracGunlukFiyat;


            if (arac.AracKullanilabilir == 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu araç şuanda kullanılmakta lütfen başka bir araç seçiniz";
                return sonuc;
            }
            if (db.Rezervasyons.Count(s => s.RezAracId == model.RezAracId && s.RezBaslangic >= model.RezBaslangic && s.RezBaslangic >= model.RezBitis || s.RezBitis >= model.RezBaslangic && s.RezBitis >= model.RezBitis) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Araç Girilen Tarihler Arasında Bir Rezervasyona Kayıtlıdır Lütfen Farklı Bir Araç Seçiniz!";
                return sonuc;
            }
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Rezervasyon Düzenlendi";
            return sonuc;
        }
        //Rezervasyon Silme
        [HttpDelete]
        [Route("api/rezsil/{rezid}")]
        public SonucModel RezSil(string rezid)
        {
            Rezervasyon kayit = db.Rezervasyons.Where(s => s.RezId == rezid).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Rezervasyon Kaydı Bulunamadı";
                return sonuc;
            }
            db.Rezervasyons.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Rezervasyon Silindi";
            return sonuc;
        }
        public class FiyatSorgu
        {
            public DateTime Baslangic { get; set; }
            public DateTime Bitis { get; set; }
            public string AracPlaka { get; set; }
            public decimal Tutar { get; set; }
        }

        [HttpGet]
        [Route("api/fiyatsorgu/{baslangic}/{bitis}/{plaka}")]
        public SonucModel FiyatSorgula(DateTime baslangic,DateTime bitis,string plaka)
        {
            SonucModel sc = new SonucModel();
            FiyatSorgu fs = new FiyatSorgu();
            Araclar aracs = db.Araclars.Where(s => s.AracPlaka == plaka).FirstOrDefault();
            fs.AracPlaka = plaka;
            fs.Baslangic = baslangic;
            fs.Bitis = bitis;
            fs.Tutar = Convert.ToInt32((bitis - baslangic).TotalDays + 1) * aracs.AracGunlukFiyat;
            sc.islem = true;
            sc.mesaj = plaka+ "'lı Aracın " + baslangic.ToShortDateString() +" " + bitis.ToShortDateString() +" Tarihleri arasındaki tutarı :" + fs.Tutar;
            return sc;
        }
        #endregion




        [HttpPost]
        [Route("api/fotoekle")]
        public SonucModel FotoEkle(AracFotografModels model)
        {
            List<AracFotografModels> liste = db.AracFotografs.Select(x => new AracFotografModels()
            {
                FotoId = x.Id,
            }).ToList();
            if (db.Araclars.Count(s => s.AracId == model.AracId) == 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Araç Bulunamadı";
                return sonuc;
            }
            int counts = liste.Count();
            AracFotograf AracFotos = new AracFotograf();
            AracFotos.FotoBase64 =  model.FotoBase64;
            AracFotos.FotoAracId = model.AracId;
            db.AracFotografs.Add(AracFotos);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Başarıyla Eklendi";
            return sonuc;

        }

    }
}