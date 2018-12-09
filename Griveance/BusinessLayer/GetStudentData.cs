using Griveance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Griveance.ResultModel;


namespace Griveance.BusinessLayer
{
    public class GetStudentData
    {

        GRContext objcontext = new GRContext();
        public object GetStudentList()
        {
            try
            {
                var StudentData = objcontext.ViewGetStudentInfoes.ToList();
                if (StudentData == null)
                {
                    return new Error { IsError = true, Message = "Student List Not Found." };
                }
                else
                {
                    return new Result { IsSucess = true, ResultData = StudentData };
                }
            }
            catch (Exception ex)
            {
                return new Error() { IsError = true, Message = ex.Message };
            }
        }
    }
}