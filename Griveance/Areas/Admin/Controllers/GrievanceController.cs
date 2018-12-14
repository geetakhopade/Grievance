using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Griveance.Areas.Admin.Controllers
{
    public class GrievanceController : Controller
    {
        // GET: Admin/Grievance
        public ActionResult Index()
        {
            return View();
        }
        //Grievance Type
        public ActionResult GrievanceType()
        {
            return View();
        }
        //Grievance cell member
        public ActionResult GrCellMember()
        {
            return View();

        }
        //All Grievance List
        public ActionResult GrievanceList()
        {
            return View();

        }

    }
}