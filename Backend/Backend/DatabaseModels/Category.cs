using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DatabaseModels
{
    public class Category
    {
        [Key]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [ForeignKey("ParentCategory")]
        public long? ParentId { get; set; }

        public virtual Category ParentCategory { get; set; }

        public virtual ICollection<Category> Children { get; set; }
    }
}