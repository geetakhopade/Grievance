using Griveance.BusinessLayer;
using Griveance.Models;
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
        public object GetUnAssignedGrievanceType()        
        {
            try
            {
                GetUnassignedGrievanceType GT = new GetUnassignedGrievanceType();
                var GrType = GT.GetUnassignedGrievance();
                return GrType;
            }
            catch(Exception e)
            {
                return new Error() { IsError = true, Message = e.Message };
                
            }

        }

    }
}
