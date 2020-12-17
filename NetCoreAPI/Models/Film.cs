using System.Collections.Generic;

namespace NetCoreAPI.Models
{
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Time { get; set; }
        public string Director { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Screening> Screenings{ get; set; }
    }
}