using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.ParamModel
{
    public class ParamRegistration
    {
        public string name { get; set; }

        public int code { get; set; }
        public string type { get; set; }

        public string gender { get; set; }

        public string email { get; set; }

        public long contact { get; set; }

        public string password { get; set; }

      

        public string course_name { get; set; }

        public string class_name { get; set; }

        

        public string department { get; set; }

        public string designation { get; set; }
        public string relationship { get; set; }
    }
}