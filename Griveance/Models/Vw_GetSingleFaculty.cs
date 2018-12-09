namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Vw_GetSingleFaculty
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Expr1 { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(100)]
        public string Expr2 { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(100)]
        public string Expr3 { get; set; }

        [Key]
        [Column(Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(100)]
        public string department { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(100)]
        public string designation { get; set; }
    }
}
