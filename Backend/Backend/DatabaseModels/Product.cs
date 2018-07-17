using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DatabaseModels
{
    public class Product
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

        [ForeignKey("Category")]
        public long? CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}