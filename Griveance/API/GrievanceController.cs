using Griveance.BusinessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Griveance.Controllers
{
    public class GrievanceController : ApiController
    {
        [HttpGet]
        public object GriveanceTypeInfo()
        {
            GetGriveanceInfo GetGriveanceTypeInfo = new GetGriveanceInfo();
            var Result = GetGriveanceTypeInfo.GetGriveanceTypeInfo();
            
            return Result;
        }

    }
}
