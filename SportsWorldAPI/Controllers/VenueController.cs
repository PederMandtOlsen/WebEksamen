using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;



[ApiController]
[Route("api/[controller]")]

public class VenueController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    [HttpGet]

    public async Task<ActionResult<List<Venue>>> Get()
    {
        List<Venue> venues = await _sportsWorldContext.Venues.ToListAsync();
        return venues;
    }

    [HttpGet("{id}")]

    public async Task<ActionResult<Venue>> GetById(int id)
    {
        Venue? venue = await _sportsWorldContext.Venues.FindAsync(id);
        if (venue != null)
        {
            return Ok(venue);
        }
        else
        {
            return NotFound($"No venue with id: {id} were found");
        }
    }

    [HttpGet("get-by-name/{name}")]
    public async Task<ActionResult<List<Venue>>> GetByName(string name)
    {

        try
        {
            List<Venue> venues = await _sportsWorldContext.Venues
            .Where(
                venue =>
                venue.Name != null &&
                venue.Name.ToLower().Contains(name.ToLower())
            )
            .ToListAsync();

            return Ok(venues);

        }
        catch (Exception e)
        {

            Console.WriteLine("Error in getbyname");
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]

    public async Task<ActionResult<Venue>> Post(Venue newVenue)
    {

        _sportsWorldContext.Venues.Add(newVenue); 
        await _sportsWorldContext.SaveChangesAsync();
        return CreatedAtAction("Get", new { id = newVenue.Id }, newVenue);
    }

    [HttpPut("{id}")]

    public async Task<ActionResult> Put(int id, Venue editedVenue)
    {

        if (id != editedVenue.Id)
            return BadRequest("Id dont match");

        _sportsWorldContext.Entry(editedVenue).State = EntityState.Modified;
        await _sportsWorldContext.SaveChangesAsync();
        return NoContent();
    }



    [HttpDelete("{id}")]

    public async Task<ActionResult<Venue>> Delete(int id)
    {
        Venue? venue = await _sportsWorldContext.Venues.FindAsync(id);
        if (venue != null)
        {
            _sportsWorldContext.Venues.Remove(venue);
            await _sportsWorldContext.SaveChangesAsync();
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }
}