namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_courses
    {
        [Key]
        public int course_id { get; set; }

        [StringLength(100)]
        public string course_name { get; set; }
    }
}
