
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
        [HttpPut]
        public object GetSingleParentInfo([FromBody]ParamUser code)
        {
            UsersBusiness UbObj = new UsersBusiness();
            var parent = UbObj.GetSingleParentInfo(code);
            return parent;
        }
    }
}
