using System.ComponentModel.DataAnnotations;

namespace Backend.DatabaseModels
{
    public class Translation
    {
        [Key]
        public string Key { get; set; }
        public string Text { get; set; }
        public string Language { get; set; }
    }
}