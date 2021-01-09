using System.Linq;
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

        [HttpGet]
        public async Task<IActionResult> getAllTicket()
        {
            var tickets = await Context.Tickets.ToListAsync();

            return StatusCode(200, new { tickets = tickets });
        }
        
        [HttpGet]
        public async Task<IActionResult> getTicketForScreening([FromRoute] int ScreeningID)
        {

            var tickets = await Context.Tickets.Where(x => x.ScreeningID == ScreeningID).ToListAsync();

            return Ok(new { tickets = tickets });
        }

        [HttpPost]
        public async Task<IActionResult> buyTicket([FromBody] Ticket ticket)
        {
            if (await Context.Tickets.AnyAsync(x => x.Seeting == ticket.Seeting && x.ScreeningID == ticket.ScreeningID) == false)
            {
                await Context.Tickets.AddAsync(ticket);

                await Context.SaveChangesAsync();
                return StatusCode(201, new { ticket = ticket });
            }

            return BadRequest("Dany bilet juz istnieje");
        }
    }
}