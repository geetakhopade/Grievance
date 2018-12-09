using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class GetAllStaffInfo
    {
        GRContext gc = new GRContext();

        public object GetStaffInfo()
        {
            try
            {
                var StaffInfo = gc.ViewAllStaffInfoes.ToList();
                if(StaffInfo==null)
                {
                    return new Error() { IsError = true, Message = "Staff Info Not Found" };

                }
                else
                {
                    return new Result()
                    {
                        IsSucess = true,
                        ResultData = StaffInfo

                    };
                }
            }
            catch(Exception ex)
            {
                return new Error() { IsError = true, Message = ex.Message };
            }
        }
    }
}