namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ViewGrievanceList")]
    public partial class ViewGrievanceList
    {
        [Key]
        [Column(Order = 0)]
        public int grivance_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(150)]
        public string grivance_name { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(400)]
        public string grivance_description { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Isalloted { get; set; }
    }
}
