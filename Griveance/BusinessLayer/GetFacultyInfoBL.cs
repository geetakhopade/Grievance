using Griveance.Models;
using Griveance.Models;
using Griveance.ParamModel;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class GetFacultyInfoBL
    {
        GRContext db = new GRContext();

        public object GetFacultyInfo(ParamGetFacultyInfo objfaculty)
        {
            try
            {
                var getfacultyinfo = db.ViewGetFacultyInfoes.ToList();
                if (getfacultyinfo == null)
                {
                    return new Error() { IsError = true, Message = "Faculty Info Not Found" };
                }
                else
                {
                    return new Result() { IsSucess = true, ResultData = getfacultyinfo };
                }
            }
            catch(Exception ex)
            {
                return new Error { IsError = true, Message = ex.Message };
            }
        }
    }
}