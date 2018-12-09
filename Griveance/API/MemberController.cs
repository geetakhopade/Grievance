using Griveance.BusinessLayer;
using Griveance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Griveance.Models;
using Griveance.BusinessLayer;

namespace Griveance.Controllers
{
    public class MemberController : ApiController
    { 
        [HttpPost]
        public object MemberSave([FromBody]Member_parameter member_para)
        {

            MemberBusiness memberbus = new MemberBusiness();





            var result = memberbus.SaveMember(member_para);
            //  bhobj.StudentsMethod(hobj);

            return result;
        }


 
      [HttpPost]
        public object GriveanceStatus([FromBody]SetStatusParameters obj)
        {
            SetGriveanceStatus Statusobj = new SetGriveanceStatus();
             var Result = Statusobj.SetStatus(obj);
            return Result;
         }
    }
}
