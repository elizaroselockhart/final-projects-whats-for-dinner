using Microsoft.EntityFrameworkCore.Migrations;

namespace Whats_For_Dinner.Migrations
{
    public partial class updatedseeddatatousemulticharacterseparator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ingredients",
                value: "4 peaches, halved (with pits removed)|;|2 teaspoons olive oil|;|1/2 cup balsamic vinegar (preferably vanilla flavored!)");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ingredients",
                value: "1/2 cup vanilla balsamic vinegar|;|1/2 cup reduced sodium fat-free chicken broth|;|1/4 cup shallots, finely chopped|;|1/4 teaspoon orange zest|;|1/4 cup orange juice|;|1 clove garlic, minced|;|8 boneless skinless chicken thighs|;|1 tablespoon olive oil|;|1 teaspoon salt, divided|;|1/2 teaspoon black pepper");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ingredients",
                value: "3 tablespoons Chipotle Olive Oil|;|3 tablespoons Black Currant Balsamic Vinegar, divided|;|1 medium or large acorn, delicata or small butternut squash|;|½ teaspoon kosher salt|;|¼ teaspoon freshly ground black pepper|;|6 oz spicy Italian sausage, bulk or with casings removed(turkey, or chicken sausage as work well)|;|3 green onions, sliced|;|2 clove garlic, minced|;|2 cups tightly packed baby kale or torn kale leaves|;|3 tablespoons chicken stock|;|¼ cup pine nuts or pepitas|;|2 tablespoons grated fresh Parmesan|;|2 tablespoons panko breadcrumbs|;|½ tablespoon Pumpkin Seed Oil (optional)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Ingredients",
                value: "4 peaches, halved (with pits removed);2 teaspoons olive oil;1/2 cup balsamic vinegar (preferably vanilla flavored!)");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Ingredients",
                value: "1/2 cup vanilla balsamic vinegar;1/2 cup reduced sodium fat-free chicken broth;1/4 cup shallots, finely chopped;1/4 teaspoon orange zest;1/4 cup orange juice;1 clove garlic, minced;8 boneless skinless chicken thighs;1 tablespoon olive oil;1 teaspoon salt, divided;1/2 teaspoon black pepper");

            migrationBuilder.UpdateData(
                table: "Recipes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Ingredients",
                value: "3 tablespoons Chipotle Olive Oil;3 tablespoons Black Currant Balsamic Vinegar, divided;1 medium or large acorn, delicata or small butternut squash;½ teaspoon kosher salt;¼ teaspoon freshly ground black pepper;6 oz spicy Italian sausage, bulk or with casings removed(turkey, or chicken sausage as work well);3 green onions, sliced;2 clove garlic, minced;2 cups tightly packed baby kale or torn kale leaves;3 tablespoons chicken stock;¼ cup pine nuts or pepitas;2 tablespoons grated fresh Parmesan;2 tablespoons panko breadcrumbs;½ tablespoon Pumpkin Seed Oil (optional)");
        }
    }
}
