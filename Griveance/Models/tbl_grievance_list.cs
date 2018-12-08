namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_grievance_list
    {
        [Key]
        public int grivance_id { get; set; }

        [Required]
        [StringLength(150)]
        public string grivance_name { get; set; }

        [Required]
        [StringLength(400)]
        public string grivance_description { get; set; }

        public int Isalloted { get; set; }
    }
}
