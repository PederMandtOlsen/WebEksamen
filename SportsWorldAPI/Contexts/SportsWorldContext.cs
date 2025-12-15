using Microsoft.EntityFrameworkCore;
using SportsWorldAPI.Models;
namespace SportsWorldAPI.Contexts;

public class SportsWorldContext(DbContextOptions<SportsWorldContext> options) : DbContext(options)
{
    public DbSet<Athlete> Athletes {get; set;}
    public DbSet<Venue> Venues {get; set;}
    public DbSet<Finance> Finances {get; set;}


}