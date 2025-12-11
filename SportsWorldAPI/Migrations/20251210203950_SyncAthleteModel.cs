using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportsWorldAPI.Migrations
{
    /// <inheritdoc />
    public partial class SyncAthleteModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchageStatus",
                table: "Athletes",
                newName: "PurchaseStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PurchaseStatus",
                table: "Athletes",
                newName: "PurchageStatus");
        }
    }
}
