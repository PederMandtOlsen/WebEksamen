using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPurchasedStatusToAthlete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchaseStatus",
                table: "Athletes",
                newName: "PurchasedStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchasedStatus",
                table: "Athletes",
                newName: "PurchaseStatus");
        }
    }
}
