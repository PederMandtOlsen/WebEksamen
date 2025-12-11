using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using SportsWorldAPI.Models;
namespace SportsWorldAPI.Contexts;

public class SportsWorldContext(DbContextOptions<SportsWorldContext> options) : DbContext(options)
{
    public DbSet<Athlete> Athletes {get; set;}


}