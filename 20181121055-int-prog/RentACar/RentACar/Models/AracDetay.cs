//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RentACar.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class AracDetay
    {
        public string AracDetayAracId { get; set; }
        public int AracKm { get; set; }
        public System.DateTime AracAlimYili { get; set; }
        public int AracKoltukSayisi { get; set; }
        public string AracYakitTipi { get; set; }
        public string AracVitesTipi { get; set; }
        public string AracRenk { get; set; }
        public string AracMotorGucu { get; set; }
        public string AracMotorHacmi { get; set; }
        public string AracKasaTipi { get; set; }
        public string AracTuru { get; set; }
    
        public virtual Araclar Araclar { get; set; }
    }
}
