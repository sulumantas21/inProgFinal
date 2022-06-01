using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentACar.ViewModels
{
    public class MusterilerModel 
    {
        public string uyeId { get; set; }
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
        public int UyeAdmin { get; set; }
        public string Email { get; set; }
        public string AdSoyad { get; set; }
        public string MusteriTc { get; set; }
        public string MusteriTel { get; set; }
        public string MusteriAdresIlk { get; set; }
        public string MusteriAdresIkinci { get; set; }
        public int MusteriRezSay { get; set; }


    }
}