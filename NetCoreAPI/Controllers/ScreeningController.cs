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
                var screenings = await Context.Screenings.Include(x => x.Film)
                                                    .Include(x => x.Hall)
                                                    .Include(x => x.Tickets)
                                                    .ToListAsync();

                return Ok(new { screenings = screenings });
            }

            return BadRequest("Nie ma zadnego seansu w bazie");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getScreening([FromRoute] int id)
        {
            if (await Context.Screenings.AnyAsync())
            {
                if (id !=0)
                {
                    var screening = await Context.Screenings.Include(x => x.Film)
                                                        .Include(x => x.Hall)
                                                        .Include(x => x.Tickets)
                                                        .FirstOrDefaultAsync(x => x.Id == id);

                    return Ok(new { screening = screening });

                }
            }

            return BadRequest("Nie ma seansu o takim id w bazie");
        }

        [HttpPost]
        public async Task<IActionResult> addScreening([FromBody]Screening screening)
        {
            if (await Context.Screenings.AnyAsync(x => x.StartTime == screening.StartTime) == false)
            {
                await Context.Screenings.AddAsync(screening);

                await Context.SaveChangesAsync();

                return StatusCode(201,new {screening = screening});
            }

            return BadRequest("Seans istnieje w bazie");
        }

        [HttpPut]
        public async Task<IActionResult> updateScreening([FromBody]Screening screening)
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