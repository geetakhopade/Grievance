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
            //var GriveanceType = (from s in db.tbl_grievance_list
            //                    select s).ToList();
            var GriveanceType =  db.tbl_grievance_list.ToList();
            return new Result() { IsSucess = true, ResultData = GriveanceType };
           
        }
    }
}