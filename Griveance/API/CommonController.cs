using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Griveance.Models;
using Griveance.BusinessLayer;

namespace Griveance.Controllers
{
    public class CommonController : ApiController
    {
        public object ShowHomeWorkAll([FromBody]student_parameters objhome)
        {
             SetIsLiveForUser obj = new SetIsLiveForUser();
            var homemworkresult = obj.UserLive(objhome);
            return homemworkresult;
        }
    }
}
