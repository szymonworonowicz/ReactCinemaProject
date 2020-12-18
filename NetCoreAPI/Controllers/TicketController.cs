using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAPI.DAL;
using NetCoreAPI.Models;

namespace NetCoreAPI.Controllers
{
    [Route("ticket")]
    public class TicketController : ControllerBase
    {
        public DataContext Context { get; }

        public TicketController(DataContext context)
        {
            this.Context = context;

        }

        [HttpPost]
        public async Task<IActionResult> buyTicket(Ticket ticket)
        {
            if (await Context.Tickets.AnyAsync(x => x.Seeting == ticket.Seeting && x.ScreeningID == ticket.ScreeningID) == false) 
            {
                await Context.Tickets.AddAsync(ticket);

                await Context.SaveChangesAsync();
            }

            return BadRequest("Dany bilet juz istnieje");
        }
    }
}