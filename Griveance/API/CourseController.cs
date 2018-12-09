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
    public class CourseController : ApiController
    {
        [HttpGet]
        public object GetCourseInfo()
        {
            CourseBusiness Cbusiness = new CourseBusiness();

            var getCourseInfo= Cbusiness.GetCourseInfo();
            return getCourseInfo;
        }

       
    }
}
