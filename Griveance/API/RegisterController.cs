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
    public class RegisterController : ApiController
    {
        [HttpPost]
        public object SaveRegistration([FromBody] ParamRegistration PR)
        {
            SaveRegistrationBL OBJSAVE = new SaveRegistrationBL();
            var result = OBJSAVE.SaveRegistration(PR);
            return result;
        }
    }
}
