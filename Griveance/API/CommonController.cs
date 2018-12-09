using Griveance.BusinessLayer;
using Griveance.ParamModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Griveance.Controllers
{
    public class CommonController : ApiController
    {

        public object SumbitGrievance([FromBody]ParamSaveGriveance objparam)
        {
            PostGriveance obj = new PostGriveance();
            var result = obj.SaveGrievance(objparam);
            return result;

        }
    }
}
