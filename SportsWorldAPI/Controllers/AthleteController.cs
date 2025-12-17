using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;




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
        }
        else
        {
            return NotFound($"Not athlete with id: {id} was found");
        }
    }



    [HttpGet("get-by-name/{name}")]
    public async Task<ActionResult<List<Athlete>>> GetByName(string name)
    {

        try
        {
            List<Athlete> athletes = await _sportsWorldContext.Athletes
            .Where(
                athlete =>
                athlete.Name != null &&
                athlete.Name.ToLower().Contains(name.ToLower())
            )
            .ToListAsync();

            return Ok(athletes);

        }
        catch (Exception e)
        {

            Console.WriteLine("Error in getbyname");
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]

    public async Task<ActionResult<Athlete>> Post(Athlete newAthlete)
    {

        _sportsWorldContext.Athletes.Add(newAthlete);
        await _sportsWorldContext.SaveChangesAsync();
        return CreatedAtAction("Get", new { id = newAthlete.Id }, newAthlete);
    }

    [HttpPut("{id}")]

    public async Task<ActionResult<Athlete>> Put(int id, Athlete editedAthlete)
    {

        if (id != editedAthlete.Id)
            return BadRequest("Id dont match");

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
        }
        else
        {
            return NotFound();
        }
    }
}