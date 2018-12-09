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
    public class MemberController : ApiController
    {
        [HttpGet]
        public object GetMemberInfo()
        {
            MemberBusiness MBusiness = new MemberBusiness();
            var member = MBusiness.GetMemberInfo();
            return member;
        }

        [HttpPut]
        public object GetSingleGrievanace([FromBody]ParamMember obj)
        {
            MemberBusiness MBusiness = new MemberBusiness();
            var grievance = MBusiness.GetSingleGrievanace(obj);
            return grievance;
        }
    }
}
