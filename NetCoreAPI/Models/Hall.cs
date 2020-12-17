using System.Collections.Generic;

namespace NetCoreAPI.Models
{
    public class Hall
    {
        public int Id { get; set; } 
        public int Capacity { get; set; }
        public virtual ICollection<Screening> Screenings{get;set;}
    }
}