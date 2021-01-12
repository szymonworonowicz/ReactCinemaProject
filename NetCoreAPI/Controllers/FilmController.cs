using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAPI.DAL;
using NetCoreAPI.Models;

namespace NetCoreAPI.Controllers
{
    [Route("film")]
    public class FilmController : ControllerBase
    {
        public DataContext Context { get; }
        public FilmController(DataContext context)
        {
            this.Context = context;
        }

        [HttpGet]
        public async Task<IActionResult> getFilms()
        {
            var films = await Context.Films.ToListAsync();

            if (films != null)
            {
                return Ok(new { films = films });
            }

            return BadRequest("Brak filmów w bazie");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getFilm([FromRoute] int id)
        {
            if (id != 0)
            {
                var films = await Context.Films.FirstOrDefaultAsync(x => x.Id == id);

                if (films != null)
                {
                    return Ok(new { films = films });
                }
            }


            return BadRequest("Brak filmów o takim id w bazie");
        }

        [HttpPut]
        public async Task<IActionResult> updateFilm([FromBody] Film film)
        {
            if (await Context.Films.AnyAsync(x => x.Id == film.Id))
            {
                try
                {
                    Context.Update(film);
                    await Context.SaveChangesAsync();
                    return Ok();
                }
                catch (DbUpdateConcurrencyException e)
                {

                    return BadRequest(e.StackTrace);
                }
            }

            return BadRequest("nie ma takiego filmu w bazie");
        }

        [HttpPost]
        public async Task<IActionResult> addFilm([FromBody] Film film)
        {
            if (await Context.Films.AnyAsync(x => x.Title == film.Title) == false)
            {
                await Context.Films.AddAsync(film);

                await Context.SaveChangesAsync();

                return StatusCode(201, new { film = film });
            }

            return BadRequest("Film istnieje juz w bazie");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteFilm([FromRoute] int? id)
        {
            if (id.HasValue)
            {

                Film film = await Context.Films.FirstOrDefaultAsync(x => x.Id == id.Value);
                if (film != null)
                {
                    Context.Films.Remove(film);

                    await Context.SaveChangesAsync();

                    return Ok();
                }
            }

            return BadRequest("Nie ma takiego filmu w bazie");

        }

        [HttpGet("popularity/{id}")]
        public async Task<IActionResult> getFilmPopularity([FromRoute] int? id)
        {
            if (id.HasValue)
            {
                var elems = Context.Screenings.Include(x => x.Tickets)
                                                    .Where(x => x.FilmId == id.Value)
                                                    .ToList()
                                                    .GroupBy(x => x.StartTime.Date)
                                                    .Select(g => new  {
                                                        date= g.Key.Date,
                                                        popularity=g.Sum(x => x.Tickets == null?0:x.Tickets.Count)
                                                    })
                                                    .OrderBy(x => x.date);

                return Ok(new { data = elems });

            }
            return BadRequest("brak filmu w bazie");
        }
    }
}