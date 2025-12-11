using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;


// Vurdere repository for Controller fra Slideserie-CRUD-fra-frontend-til-backend


[ApiController]
[Route("api/[controller]")]

public class AthleteController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    [HttpGet]

    public async Task<ActionResult<List<Athlete>>> Get()
    {
        List<Athlete> athletes = await _sportsWorldContext.Athletes.ToListAsync();
        return athletes;
    }

    [HttpGet("{id}")] 

    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(id);
        if (athlete != null)
        {
            return Ok(athlete);
        } else
        {
            return NotFound("Not athlete with id: ${id} were found");
        }
    }

    [HttpGet("debug")]
public async Task<ActionResult<List<Athlete>>> Debug()
{
    var athletes = await _sportsWorldContext.Athletes.ToListAsync();
    return athletes;
}

    /*
    [HttpGet]  
    [Route("[action]/{name}")]  
    public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {

        try {
        List<Athlete> athletes = await _sportsWorldContext.Athletes
        .Where(
            athlete => athlete.Name.Contains(
                name, 
                StringComparison.CurrentCultureIgnoreCase
            )
        ).ToListAsync();
        return Ok(athletes);
        } catch (Exception e)
        {
            return StatusCode(500);
        }
    }
    */
    



    [HttpPost] 

    public async Task<ActionResult<Athlete>> Post(Athlete newAthlete)
    {
       _sportsWorldContext.Athletes.Add(newAthlete);
       await _sportsWorldContext.SaveChangesAsync();
       return CreatedAtAction("Get", new {id = newAthlete.Id}, newAthlete);
    }
    
    [HttpPut] 

    public async Task<ActionResult<Athlete>> Put(Athlete editedAthlete)
    {
       _sportsWorldContext.Entry(editedAthlete).State = EntityState.Modified;
       await _sportsWorldContext.SaveChangesAsync();
       return NoContent();
    }



    [HttpDelete("{id}")] 

    public async Task<ActionResult<Athlete>> Delete(int id)
    {
        Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(id);
        if (athlete != null)
        {
            _sportsWorldContext.Athletes.Remove(athlete);
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent();
        } else
        {
            return NotFound();
        }
    }
} 