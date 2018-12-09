using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Griveance.Models;
using System.Web.Http;
using Griveance.ResultModel;
using System.Data.Entity.Validation;

namespace Griveance.BusinessLayer
{
    public class MemberBusiness
    {
        public object SaveMember([FromBody]Member_parameter obj)
        {

            GRContext db = new GRContext();
            tbl_member objmember = new tbl_member();
           
            objmember.id = Convert.ToInt32(obj.id);
            objmember.code = Convert.ToInt32(obj.code);
            objmember.designation = obj.designation.ToString();
            objmember.griType = obj.griType.ToString();         
            db.tbl_member.Add(objmember);           
            db.SaveChanges();

            tbl_user objuser = new tbl_user();
            objuser.name = obj.Name.ToString();
            objuser.code = obj.code;
            objuser.type = obj.type.ToString();
            objuser.gender = obj.Gender.ToString();
            objuser.email = obj.Email_id.ToString();
            objuser.contact = Convert.ToInt64(obj.Mobile_no);
            objuser.password = obj.Password;
            objuser.status = 1;
            objuser.Islive = 0;

            db.tbl_user.Add(objuser);
          
            try
            {
                db.SaveChanges();
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting  
                        // the current instance as InnerException  
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }

            return new Result
            {

                IsSucess = true,
                ResultData = "Member Created!"
            };



        }
    }
}