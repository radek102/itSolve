using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Backend.Dtos
{
    public class ProductDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public long? CategoryId { get; set; }
    }
}