using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class SetGriveanceStatus
    {
        GRContext db = new GRContext();
        public object SetStatus(SetStatusParameters obj)
        {
            try
            {
                tbl_complaintdetails cobj = db.tbl_complaintdetails.First(r => r.CompID == obj.CompID);
                if (cobj != null)
                {
                    cobj.CompID = obj.CompID;
                    cobj.GrievanceAction = obj.GrievanceAction;
                    cobj.status = obj.status;
                    db.SaveChanges();
                    return new Result() { IsSucess = true, ResultData = "Status Updates Successfully.." };
                }
                else
                {
                    return new Error() { IsError = true, Message = " Record Not Found" };
                }

               
            }
            catch(Exception ex)
            {
                return new Error() { IsError = true, Message = " Error" };
            }
        }
    }
}