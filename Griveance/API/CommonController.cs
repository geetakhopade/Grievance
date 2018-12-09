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
        [HttpPost]
        public object GetMyGrievance([FromBody]ParamGetMyGrievance objmy)
        {
            GetMyGrievanceBL obj = new GetMyGrievanceBL();
            var mygrievance = obj.GetMyGrievance(objmy);
            return mygrievance;
        }
    }
}
