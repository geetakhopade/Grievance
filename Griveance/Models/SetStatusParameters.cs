using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.Models
{
    public class SetStatusParameters
    {
        public int CompID { get; set; }
        public string GrievanceAction { get; set; }
        public string status { get; set; }
    }
}