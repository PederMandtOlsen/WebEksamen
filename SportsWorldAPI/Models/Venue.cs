using System.ComponentModel.DataAnnotations;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;

public class Venue : IVenue
{
    [Key]
    public int Id {get; set;}
    public string Name {get; set;} = String.Empty;
    public int Capacity {get; set;}
    public string Image {get; set;} = String.Empty;
}