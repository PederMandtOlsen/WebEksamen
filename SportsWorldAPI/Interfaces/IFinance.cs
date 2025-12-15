using System.ComponentModel.DataAnnotations;

namespace SportsWorldAPI.Interfaces;
interface IFinance
{
    [Key]
    int Id {get; set;}
    int MoneyLeft {get; set;}
    int NumberOfPurchases {get; set;}
    int MoneySpent {get; set;}
}