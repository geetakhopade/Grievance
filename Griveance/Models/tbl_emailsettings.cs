namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tbl_emailsettings
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(100)]
        public string fromid { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string host { get; set; }

        [Key]
        [Column(Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int port { get; set; }
    }
}
