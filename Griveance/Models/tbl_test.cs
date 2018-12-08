namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_test
    {
        [Key]
        [StringLength(1000)]
        public string data { get; set; }
    }
}
