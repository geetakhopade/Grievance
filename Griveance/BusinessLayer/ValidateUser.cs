﻿using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class ValidateUser
    {
        GRContext db = new GRContext();
        public object IsValidUser(UserCredentialModel userCredentialModel)
        {
            try
            {
                var user = db.tbl_user.FirstOrDefault(r => r.email == userCredentialModel.UserName
                     && r.password == userCredentialModel.Password);

                if (user == null)
                {
                    return new Error() { IsError = true, Message = "Incorrect User Or Password.." };
                }
                else
                {
                    return new Result() { IsSucess = true, ResultData = "Login Successfully.." };
                }
            }
            catch(Exception e)
            {
                return new Error { IsError = true, Message = e.Message };
            }
           

           
           
        }
    }
}