using Microsoft.AspNetCore.Mvc;
using SportsWorldAPI.Contexts;

namespace SportsWorldAPI.Controllers;

[ApiController]
[Route("[controller]")]

public class FinanceController(SportsWorldContext _sportsWorldContext) : ControllerBase
{
    
}