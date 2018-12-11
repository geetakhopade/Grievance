using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class GetGriveanceInfo
    {
        GRContext db = new GRContext();
        public object GetGriveanceTypeInfo()
        {
            try
            {
                var GriveanceType = db.tbl_grievance_list.ToList();
                return new Result() { IsSucess = true, ResultData = GriveanceType };
            }
            catch(Exception e)
            {
                return new Error { IsError = true, Message = e.Message };
            }
            
           
        }
    }
}