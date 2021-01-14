using System;
using System.Collections.Generic;

namespace NetCoreAPI.Models
{
    public class Screening
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public int FilmId { get; set; }
        public int HallId { get; set; }

        public virtual Film Film { get; set; }
        public virtual Hall Hall {get;set;}
        public virtual ICollection<Ticket> Tickets {get;set;}
    }
}