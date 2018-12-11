using Griveance.BusinessLayer;
using Griveance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Griveance.ParamModel;

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
        [HttpPost]
        public object CreateCourse([FromBody]CourseParameter course_parameter)
        {
            CourseBusiness course_business = new CourseBusiness();
            var Result = course_business.NewCourse(course_parameter);
            return Result;
        }

       
    }
}
