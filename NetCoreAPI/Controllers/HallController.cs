using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreAPI.DAL;

namespace NetCoreAPI.Controllers
{
    [Route("hall")]
    public class HallController : ControllerBase
    {
        public DataContext Context { get; }
        public HallController(DataContext context)
        {
            this.Context = context;
        }
        [HttpGet]
        public async Task<IActionResult> getHalls() 
        {
            var halls = await Context.Halls.ToListAsync();

            if(halls!=null) {
                return Ok(new {halls = halls});
            }
            return BadRequest();
        }
    }
}