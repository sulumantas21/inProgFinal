﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentACar.ViewModels
{
    public class AracFotografModel
    {
        public int FotoId { get; set; }
        public string FotoBase64 { get; set; }
        public string AracId { get; set; }
        public AraclarModel AracBilgi { get; set; }
    }
}