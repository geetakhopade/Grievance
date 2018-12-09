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
    public class UsersController : ApiController
    {
     [HttpPost]
        public object GetStudentInfo([FromBody]ParamUserLogin obj)
        {
            GetStudentData objStudent = new GetStudentData();
            var result = objStudent.GetStudentList();
            return result;

        }
        [HttpPost]
        public object GetParentInfo([FromBody]ParamUserLogin obj)
        {
            GetParentData objParent = new GetParentData();
            var result = objParent.GetParentList();
            return result;

        }

        [HttpPost]
        public object GetSingleStaff([FromBody]ParamGetSingleStaffInfo obj)
        {
            GetSingleStaffData objstaff = new GetSingleStaffData();
            var result = objstaff.GetSingleStaffValue(obj);
            return result;

        }

    }
}
