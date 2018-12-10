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
    public class LoginController : ApiController
    {
		
		[HttpGet]
		public object test()
		{
			return "test";
		}

		[HttpGet]
		public object GetUser()
		{
			UserCredentialModel userCredentialModel = new UserCredentialModel() { User = "pradip.chougule@jjmcoe.ac.in" };
			return userCredentialModel;
		}

		[HttpPost]
		public object ValidateUser(UserCredentialModel userCredentialModel)
		{
			

            ValidateUser Validuser = new ValidateUser();
          var result=  Validuser.IsValidUser(userCredentialModel);
            return result;


		}
    }
}
