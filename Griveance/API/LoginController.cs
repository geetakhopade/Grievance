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
			GRContext context = new GRContext();
			var user =  context.tbl_user.FirstOrDefault(r => r.email == userCredentialModel.User 
							&& r.password == userCredentialModel.Password);

			if (user == null)
				return "User Id & Password Is Invalid";
			  
			return "Success";
		}
    }
}
