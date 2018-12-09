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
    public class GrievanceController : ApiController
    { 
        [HttpPost]
        public object GetAllGrievanceList([FromBody] ParamGetGrievanceList objparam)
        {
            GetGrievanceListBL obj = new GetGrievanceListBL();
            var GetGrievance = obj.GetGrievanceList(objparam);
                return GetGrievance;
        } 

        [HttpGet]
        public object GriveanceTypeInfo()
        {
            GetGriveanceInfo GetGriveanceTypeInfo = new GetGriveanceInfo();
            var Result = GetGriveanceTypeInfo.GetGriveanceTypeInfo();
            
            return Result;
        } 
    }
}
