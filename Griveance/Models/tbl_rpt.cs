namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_rpt
    {
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }
    }
}
