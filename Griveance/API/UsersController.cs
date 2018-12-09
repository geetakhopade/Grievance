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
        public object GetSingleStudentInfo([FromBody]ParamGetSingleStudent objstudent)
        {
            GetSingleStudentBL obj = new GetSingleStudentBL();
            var singlestudentresult = obj.GetSingleStudent(objstudent);
            return singlestudentresult;
        }


        [HttpPost]
        public object GetFacultyInfo([FromBody]ParamGetFacultyInfo objfaculty)
        {
            GetFacultyInfoBL obj = new GetFacultyInfoBL();
            var facultyinfo = obj.GetFacultyInfo(objfaculty);
            return facultyinfo;
        }
    }
}
