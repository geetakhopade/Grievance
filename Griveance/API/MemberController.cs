using Griveance.BusinessLayer;
using Griveance.Models;
using Griveance.ParamModel;
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
        [HttpPost]
        public object SetIsLiveForMember([FromBody]ParamMember PM)
        {
            try
            {
                SetMemberStatus SM = new SetMemberStatus();
                var Status = SM.SetIsLiveStatusMember(PM);
                return Status;

            }
            catch(Exception e)
            {
                return new Error() { IsError = true, Message = e.Message };
            }
        }
    }
}
