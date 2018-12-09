using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class MemberBusiness
    {
        public object GetMemberInfo()
        {
            GRContext context = new GRContext();
            try
            {
                var member = context.ViewGetMemberInfoes.ToList();
                if (member == null)
                {
                    return new Result { IsSucess = false, ResultData = "Member Record Not Found" };
                }
                else
                {
                    return new Result { IsSucess = true, ResultData = member };
                }
            }
            catch (Exception ex)
            {
                return new Error { IsError = true, Message = ex.Message };
            }

        }
        public object GetSingleGrievanace(ParamMember obj)
        {

            GRContext context = new GRContext();
            try
            {
                var grievance = context.ViewGetMemberInfoes.Where(r => r.code == obj.code).FirstOrDefault();
                if (grievance == null)
                {
                    return new Result { IsSucess = false, ResultData = "Record Not Found" };
                }
                else
                {
                    return new Result { IsSucess = true, ResultData = grievance };
                }
            }
            catch (Exception ex)
            {
                return new Error { IsError = true, Message = ex.Message };
            }
        }

    }
}