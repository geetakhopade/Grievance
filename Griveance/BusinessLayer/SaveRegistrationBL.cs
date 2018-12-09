using Griveance.Models;
using Griveance.ParamModel;
using Griveance.ResultModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Griveance.BusinessLayer
{
    public class SaveRegistrationBL
    {
        GRContext db = new GRContext();
        public object SaveRegistration(ParamRegistration PR)
        {
            try
            {
                tbl_user objuser = new tbl_user();
                objuser.name = PR.name;
                objuser.code = PR.code;
                objuser.type = PR.type;
                objuser.gender = PR.gender;
                objuser.email = PR.email;
                objuser.contact = PR.contact;
                objuser.password = PR.password;
                objuser.status = 1;
                objuser.Islive = 1;
                db.tbl_user.Add(objuser);
                db.SaveChanges();

                if (PR.type == "Student")
                {
                    tbl_student objstudent = new tbl_student();
                    objstudent.code = PR.code;
                    objstudent.course_name = PR.course_name;
                    objstudent.class_name = PR.class_name;
                    objstudent.IsParent = 0;
                    db.tbl_student.Add(objstudent);
                    db.SaveChanges();
                }
                else if (PR.type == "Faculty")
                {
                    tbl_faculty objfaculty = new tbl_faculty();
                    objfaculty.code = PR.code;
                    objfaculty.department = PR.department;
                    objfaculty.designation = PR.designation;
                    db.tbl_faculty.Add(objfaculty);
                    db.SaveChanges();
                }
                else if (PR.type == "Parent")
                {
                    tbl_parent objparent = new tbl_parent();
                    objparent.code = PR.code;
                    objparent.relationship = PR.relationship;
                    db.tbl_parent.Add(objparent);
                    db.SaveChanges();

                    tbl_student objstudent = db.tbl_student.Where(r => r.code == PR.code).FirstOrDefault();
                    objstudent.IsParent = 1;
                    db.SaveChanges();
                }
                else if (PR.type == "Staff")
                {
                    tbl_staff objstaff = new tbl_staff();
                    objstaff.code = PR.code;
                    objstaff.department = PR.department;
                    objstaff.designation = PR.designation;
                    db.tbl_staff.Add(objstaff);
                    db.SaveChanges();
                }
                else
                {
                    return new Error() { IsError = true, Message ="User Type Not Matched." };
                }
                return new Result() { IsSucess= true, ResultData = "User Saved Successfully." };
            }
            catch(Exception ex)
            {
                return new Error() { IsError = true, Message = ex.Message };
            }
        }
    }
}