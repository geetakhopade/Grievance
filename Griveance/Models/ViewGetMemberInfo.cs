namespace Griveance.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ViewGetMemberInfo")]
    public partial class ViewGetMemberInfo
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int code { get; set; }

        [StringLength(100)]
        public string name { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(100)]
        public string designation { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(200)]
        public string griType { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(100)]
        public string email { get; set; }

        public long? contact { get; set; }

        [Key]
        [Column(Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Islive { get; set; }

        [Key]
        [Column(Order = 6)]
        [StringLength(100)]
        public string password { get; set; }
    }
}
