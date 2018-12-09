using Griveance.BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Griveance.Controllers
{
    public class ClassYearController : ApiController
    {
        [HttpGet]
        public object GetClassInfo()
        {
            GetClassInfoBL Objclass = new GetClassInfoBL();
            var GetClassVar = Objclass.ClassInfoBL();
            return GetClassVar;
        }
    }
}
