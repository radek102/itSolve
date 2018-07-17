using System.Collections.Generic;

namespace Backend.Dtos
{
    public class CategoryNodeDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long? ParentId { get; set; }
        public ICollection<CategoryNodeDto> Children { get; set; }
    }
}