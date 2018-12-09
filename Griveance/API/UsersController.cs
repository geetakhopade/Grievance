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
    public class UsersController : ApiController
    {
        [HttpGet]
        public object GetStaffInfo()
        {
            try
            {
                GetAllStaffInfo obj = new GetAllStaffInfo();
                var StaffInfo = obj.GetStaffInfo();
                return StaffInfo;
            }
            catch (Exception ex)
            {
                return new Error() { IsError = true, Message = ex.Message };
            }
        }
    }
}
