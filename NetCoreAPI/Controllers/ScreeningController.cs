using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAPI.DAL;
using NetCoreAPI.Models;

namespace NetCoreAPI.Controllers
{
    [Route("screening")]
    public class ScreeningController : ControllerBase
    {
        public DataContext Context { get; }
        public ScreeningController(DataContext context)
        {
            this.Context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getScreenings()
        {
            if (await Context.Screenings.AnyAsync())
            {
                var screenings = Context.Screenings.Include(x => x.Film)
                                                    .Include(x => x.Hall)
                                                    .Include(x => x.Tickets)
                                                    .ToListAsync();

                return Ok(new { screenings = screenings });
            }

            return BadRequest("Nie ma zadnego seansu w bazie");
        }

        [HttpGet]
        public async Task<IActionResult> getScreenings(int? id)
        {
            if (await Context.Screenings.AnyAsync())
            {
                if (id.HasValue)
                {
                    var screenings = Context.Screenings.Include(x => x.Film)
                                                        .Include(x => x.Hall)
                                                        .Include(x => x.Tickets)
                                                        .FirstOrDefaultAsync(x => x.Id == id.Value);

                    return Ok(new { screenings = screenings });

                }
            }

            return BadRequest("Nie ma seansu o takim id w bazie");
        }

        [HttpPost]
        public async Task<IActionResult> addScreening(Screening screening)
        {
            if (await Context.Screenings.AnyAsync(x => x.StartTime == screening.StartTime) == false)
            {
                await Context.Screenings.AddAsync(screening);

                await Context.SaveChangesAsync();

                return StatusCode(201);
            }

            return BadRequest("Seans istnieje w bazie");
        }

        [HttpPut]
        public async Task<IActionResult> updateScreening(Screening screening)
        {
            if(await Context.Screenings.AnyAsync( x => x.Id == screening.Id)) 
            {
                try
                {
                    Context.Screenings.Update(screening);

                    await Context.SaveChangesAsync();

                    return Ok();
                }
                catch (System.Exception)
                {
                    
                    throw;
                }
            }

            return BadRequest("Dany seans nie istnieje w bazie");
        }
    }
}