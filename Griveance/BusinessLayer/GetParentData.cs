using Griveance.Models;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class GetParentData
    {
        GRContext objcontext = new GRContext();
        public object GetParentList()
        {
            try
            {
                var GetParent = objcontext.ViewGetSingleParentInfoes.ToList();
                if (GetParent == null)
                {
                    return new Error { IsError = true, Message = "Parent List Not Found." };
                }
                else
                {
                    return new Result { IsSucess = true, ResultData = GetParent };
                }
               

            }
            catch (Exception ex)
            {
                return new Error() { IsError = true, Message = ex.Message };
            }
        }
    }
}