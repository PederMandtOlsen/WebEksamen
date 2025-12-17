using System.ComponentModel.DataAnnotations;
using SportsWorldAPI.Interfaces;

namespace SportsWorldAPI.Models;


public class Finance : IFinance
{
    [Key]
    public int Id { get; set; }
    public int MoneyLeft { get; set; }
    public int NumberOfPurchases { get; set; }
    public int MoneySpent { get; set; }
}