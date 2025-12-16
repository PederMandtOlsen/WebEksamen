using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Contexts;
using SportsWorldAPI.Models;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FinanceController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {

        Finance? finance = await _sportsWorldContext.Finances.FirstOrDefaultAsync();
        if (finance == null)
        {
            finance = new Finance
            {
                MoneyLeft = 0,
                NumberOfPurchases = 0,
                MoneySpent = 0
            };
            _sportsWorldContext.Finances.Add(finance);
            await _sportsWorldContext.SaveChangesAsync();
        }
        return Ok(finance);
    }


    [HttpPost("add-loan/{amount}")]
    public async Task<ActionResult<Finance>> AddLoan(int amount)
    {
        Finance? finance = await _sportsWorldContext.Finances.FirstOrDefaultAsync();
        if (finance == null)
        {
            finance = new Finance
            {
                MoneyLeft = amount,
                NumberOfPurchases = 0,
                MoneySpent = 0
            };
            _sportsWorldContext.Finances.Add(finance);
        }
        else
        {
            finance.MoneyLeft += amount;
        }
        
        await _sportsWorldContext.SaveChangesAsync();
        return Ok(finance);
    }

    [HttpPost("purchase-athlete/{athleteId}")]
    public async Task<ActionResult<Finance>> PurchaseAthlete(int athleteId)
    {

        Athlete? athlete = await _sportsWorldContext.Athletes.FindAsync(athleteId);
        if (athlete == null)
        {
            return NotFound($"Athlete with id {athleteId} not found");
        }

        if (athlete.PurchasedStatus)
        {
            return BadRequest("Athlete has already been purchased");
        }


        Finance? finance = await _sportsWorldContext.Finances.FirstOrDefaultAsync();
        if (finance == null)
        {
            return BadRequest("No finance record found");
        }

        if (finance.MoneyLeft < athlete.Price)
        {
            return BadRequest("Insufficient funds to purchase athlete");
        }


        athlete.PurchasedStatus = true;

        finance.MoneyLeft -= athlete.Price;
        finance.MoneySpent += athlete.Price;
        finance.NumberOfPurchases += 1;

        await _sportsWorldContext.SaveChangesAsync();
        
        return Ok(finance);
    }
}